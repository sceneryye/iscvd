(function($) {
    $(function() {

        $('body').on('focus', '.other-input', function (e){
            var input = this;
            $( this ).autocomplete({
                source: phpVars.ingredient_names,
                select: function( event, ui ) {
                    var select = event.currentTarget;
                    var item_slug;
                    (phpVars.ingredients).forEach(function(element, index, array){
                        if(ui.item.value == element.name){
                            item_slug = element.slug;
                            return;
                        }
                    });
                    $.ajax({
                        url: ajaxurl,
                        method: 'post',
                        dataType: 'json',
                        data: {
                            'action': 'get_ingredient_category',
                            'item_slug': item_slug
                        },
                        success : function (data) {
                            var category_select = $(input).closest('.other-block-row').find('.other-select-category');
                            $(category_select).find('option').removeAttr("selected");
                            $(category_select).find('option[value="'+data+'"]').attr('selected', 'selected');
                        },
                        error: function( jqXHR, textStatus, errorThrown){
                            processingError(jqXHR);
                        }
                    });
                }
            });
        });

        if (typeof(ajaxurl) == 'undefined'){
            var ajaxurl = phpVars.ajaxurl;
        }
        /*reset button*/
        $('body').on('click', '.reset-user-week-plan', function (e) {
            if (!confirm("Are you sure you want to reset your edited meal plan to the Paleo Plan default meal plan?")) {
                return false;
            }

            var weekDate = $(this).attr('weekDate');
            var postId = $(this).attr('postId');
            var userId = $(this).attr('userId');
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'resetWeekUser',
                    'weekDate': weekDate,
                    'postId': postId,
                    'userId': userId
                },
                success : function (data) {
                    if (data.success == 1){
                        location.reload();
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                }
            });
        });

        /*start delete day action(s)*/
        $('body').on ('click', '.delete-all-day-actions', function(e) {
            var dayAction = $(this).data('day_action');
            var confirmation_text = "Are you sure you want to delete all ";
            if(dayAction == 'Lunch'){
                confirmation_text+='Lunches';
            }
            else{
                confirmation_text+= dayAction+'s';
            }
            confirmation_text+= ' and any associated leftovers?';
            if (confirm(confirmation_text)) {
                deleteMeal(dayAction);
            }
            return false;
        });
        $('body').on ('click', '.delete-day-meal', function(e) {
            var dayAction = $(this).data('day_action');
            var weekDay = $(this).data('week_day')
            if (confirm("Are you sure you want to delete this "+dayAction+" and any associated leftovers?")) {
                deleteMeal(dayAction,weekDay);
            }
            return false;
        });
        /*end delete day action(s)*/

        /*cancel edit*/
        $('body').on('click', '.cancel-meal-plan', function (e) {
            if (!confirm("Are sure you'd like to cancel/remove all changes?")) {
                return false;
            }
            var postId = $('#post_id').val();
            var weekDate = $('#current_week_date').val();
            $.ajax({
                url: ajaxurl,
                method: 'POST',
                dataType: 'JSON',
                data: {
                    action: 'changedDataCancellation',
                    postId: postId,
                    weekDate: weekDate
                },
                beforeSend: function(){
                    $.fancybox.helpers.overlay.open({parent: 'body'});
                    $.fancybox.showLoading();
                },
                success: function (data) {
                    if (data.success && data.success == 1) {
                        if(data.redirectTo != undefined){
                            window.location = data.redirectTo;
                        }
                    }
                    else if (data.error != undefined) {
                        $.fancybox.hideLoading();
                        $.fancybox.helpers.overlay.close();
                        alert(data.error);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                    $.fancybox.hideLoading();
                    $.fancybox.helpers.overlay.close();
                }
            });
            return false;
        });

        /*save changes*/
        $('body').on('click', '.save-meal-plan', function (e) {
            var postId = $('#post_id').val();
            var formData = $("#pp_plan_form").serialize();
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'changedDataApplication',
                    'postId': postId,
                    'formData': formData
                },
                beforeSend: function(){
                    $.fancybox.helpers.overlay.open({parent: 'body'});
                    $.fancybox.showLoading();
                },
                success: function (response) {
                    if(response){
                        if($.isEmptyObject(response.errors)){
                            if(response.data.redirectTo){
                                window.location = response.data.redirectTo;
                            }
                        }
                        else{
                            $.fancybox.hideLoading();
                            $.fancybox.helpers.overlay.close();
                            processingError(response);
                        }
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                    $.fancybox.hideLoading();
                    $.fancybox.helpers.overlay.close();
                }
            });
            return false;
        });

        /*reset prep*/
        $('body').on('click', '.reset-prep-button', function (e) {
            var err = false;
            var postId = $('#post_id').val();
            var weekDay = $(this).attr('day');
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    action: 'reset_edited_prep',
                    postId: postId,
                    weekDay: weekDay,
                    currentWeekDate: encodeURIComponent($('#current_week_date').val()),
                    isFrontend: 1
                },
                success: function (data) {
                    if (data && data.success && data.success == 1 && data.html != undefined){
                        $('#pp_plan_form').replaceWith(data.html);
                        if (data.redirectUrl != undefined) {
                            window.location = data.redirectUrl;
                        }
                    }
                    $.fancybox.close();
                }
            });
            return false;
        });

        /*edit prep*/
        $('body').on('click', '.edit-prep-link', function (e) {
            var day = $(this).attr('day');

            var postId = $('#post_id').val();
            var weekDay = $(this).attr('day');
            var dayAction = $(this).data('day_action');

            var currentWeekDate = encodeURIComponent($('#pp_list_week').val());
            var mealNumber = $("#"+weekDay+"_"+dayAction+"_MealNumb").val();

            if (mealNumber =='none'){
                mealNumber = '';
            }
            $('#mealEdited_'+dayAction+'_'+mealNumber).val(1);
            $('#meal-number-'+mealNumber).addClass('edited-color');
            $('#meal-type-'+mealNumber).addClass('edited-color');

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'edit_prep_popup',
                    postId: postId,
                    weekDay: weekDay,
                    dayAction: dayAction,
                    currentWeekDate: currentWeekDate,
                    mealNumber: mealNumber,
                    frontend: 1
                },
                dataType: 'json',
                beforeSend: function(){
                    $.fancybox.helpers.overlay.open({parent: 'body'});
                    $.fancybox.showLoading();
                },
                success: function(data){
                    $.fancybox.helpers.overlay.close();
                    if(data.success && data.html){
                        $.fancybox(data.html, {
                            transitionIn: 'none',
                            transitionOut: 'none',
                            centerOnScroll: true,
                            helpers: {
                                overlay: {
                                    css: {
                                        'background': 'rgba(58, 42, 45, 0.95)'
                                    }
                                }
                            },
                            afterShow: function(){
                                initJQTemplates();
                            }
                        });
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                    $.fancybox.helpers.overlay.close();
                    $.fancybox.hideLoading();
                }
            });
            return false;
        });

        /*start prep*/
        $('body').on('change', '.prep-days-dd', function (e) {
            if ($(this).val() == '') {
                if (!confirm("Are you sure you want to delete this prep?")) {
                    $(this).val($(this).attr('selected_day'));
                }
                else {
                    $(this).parents('tr').find('input:checkbox').prop('checked', false);
                    $('#prep-instructions-' + $(this).attr('recipeblock')).val('');
                    $('#div-prep-instructions-' + $(this).attr('recipeblock')+' .edit-prep-instructions ').hide();
                }
            }
            else {
                $(this).attr('selected_day', $(this).val());
                $(this).parents('tr').find('input:checkbox').prop('checked', true);
                $('#div-prep-instructions-' + $(this).attr('recipeblock') + ' .edit-prep-instructions ').show();

            }
        });

        $('body').on('click', '.show-prep_instructions', function (e) {
            if ($(this).is(':checked')) {
                $('#div-prep-instructions-' + $(this).attr('prepBlock') + ' .edit-prep-instructions').show();

            }
            else {
                $('#div-prep-instructions-' + $(this).attr('prepBlock') + ' .edit-prep-instructions').hide();
                $('prep-instructions-' + $(this).attr('prepBlock')).val('');
            }
            return false;
        });

        $('body').on('change', '.other-prep-days-dd', function (e) {
            if ($(this).val() == '') {
                if (!confirm("Are you sure you want to delete this prep?")) {
                    $(this).val($(this).attr('selected_day'));
                }
                else {
                    $(this).parents('.row-input').find('input:checkbox').prop('checked', false);
                    $('#other-prep-instructions-' + $(this).attr('recipeblock')).val('');
                    $('#div-other-prep-instructions-' + $(this).attr('recipeblock') + ' .edit-other-prep-instructions').hide();
                }
            }
            else {
                $(this).attr('selected_day', $(this).val());
                $(this).parents('.row-input').find('input:checkbox').prop('checked', true);
                $('#div-other-prep-instructions-' + $(this).attr('recipeblock') + ' .edit-other-prep-instructions').show();

            }
        });

        $('body').on('click', '.show-other-prep_instructions', function (e) {
            if ($(this).is(':checked')) {
                $('#div-other-prep-instructions-' + $(this).attr('prepblock') + ' .edit-other-prep-instructions').show();
            }
            else {
                $('#div-other-prep-instructions-' + $(this).attr('prepblock') + ' .edit-other-prep-instructions').hide();
                $('#other-prep-instructions-' + $(this).attr('prepblock')).val('');
            }
            return false;
        });
        /*end prep*/

        /*EDIT POPUP*/
        $('body').on('click', '.edit-day-meal, .add-day-meal', function (e) {

            var postId = $('#post_id').val();
            var weekDay = $(this).data('week_day');
            var dayAction = $(this).data('day_action');

            var currentWeekDate = encodeURIComponent($('#pp_list_week').val());
            var mealNumber = $("#"+weekDay+"_"+dayAction+"_MealNumb").val();

            if (mealNumber =='none'){
                mealNumber = '';
            }
            $('#mealEdited_'+dayAction+'_'+mealNumber).val(1);
            $('#meal-number-'+mealNumber).addClass('edited-color');
            $('#meal-type-'+mealNumber).addClass('edited-color');

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'edit_popup',
                    postId: postId,
                    weekDay: weekDay,
                    dayAction: dayAction,
                    currentWeekDate: currentWeekDate,
                    mealNumber: mealNumber,
                    frontend: 1
                },
                dataType: 'json',
                beforeSend: function(){
                    $.fancybox.helpers.overlay.open({parent: 'body'});
                    $.fancybox.showLoading();
                },
                success: function(data){
                    $.fancybox.helpers.overlay.close();
                    if(data.success && data.html){
                        $.fancybox(data.html, {
                            transitionIn: 'none',
                            transitionOut: 'none',
                            centerOnScroll: true,
                            helpers: {
                                overlay: {
                                    css: {
                                        'background': 'rgba(58, 42, 45, 0.95)'
                                    }
                                }
                            },
                            afterShow: function(){
                                initJQTemplates();
                            }
                        });
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                    $.fancybox.helpers.overlay.close();
                    $.fancybox.hideLoading();
                }
            });
            return false;
        });

        /*start category and recipe*/
        $('body').on('change', '.select-category', function (e) {
            loadRecipesByCategory('getRecipeListByCategory', this);
        });

        $('body').on('change', '.leftovers-select-category', function (e) {
            loadRecipesByCategory('getLeftoversRecipeListByCategory', this);
        });

        $('body').on('change', '.recipe_recipes_dd', function (e) {
            var recipeId = $(this).val();
            var blockCounter = $(this).attr('blockCounter');
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'getRecipeNumberOfServings',
                    'recipeId': recipeId,
                    'blockCounter': blockCounter
                },
                success: function (data) {
                    if (data.success == 1 && data.numberOfServings != undefined) {
                        $('#numberOfServings-' + data.blockCounter).val(data.numberOfServings);
                    }
                    else if (data.error != undefined) {
                        alert(data.error);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    processingError(jqXHR);
                }
            });
        });
        /*end category and recipe*/

        $('body').on('change', '.other-select-category', function (e) {
            $('#show_in_shopping_list_' + $(this).attr('recipeblock')).prop("checked", true);
        });

        $('body').on('change', '#pp_meals', function (e) {
            updateEditPopup();
        });

        $('body').on('change', '#pp_week', function (e) {
            updateEditPopup(true);
        });

        $('body').on('change', '#pp_days', function (e) {
            updateEditPopup();
        });

        $('body').on('click', '#submit-pp-popup', function (e) {
            if (confirm("Are you sure you want to save changes? All leftovers related to the edited or deleted recipes will be removed.")){
                submitPopUp();
            }

            return false;
        });
        $('body').on('click', '#submit-prep-popup', function (e) {
            if (confirm("Are you sure you want to change prep?")){
                submitPrepPopUp();
            }

            return false;
        });

        $('body').on('click', '#cancel-pp-popup', function (e) {
            $.fancybox.close();
            return false;
        });

        $('body').on('click', '#cancel-prep-popup', function (e) {
            $.fancybox.close();
            return false;
        });

        $('body').on('click', '.add-recipe', function (e) {
            if($.trim($("#Recipe-container").html()) == ""){
                var blockIndex = 0;
            }
            else{
                var blockIndex = $("#Recipe-container > div:last-child").data('block_index');
            }
            if(blockIndex != undefined){
                $.tmpl( "jq-new_recipe_block", { "blockIndex" : blockIndex + 1 }).appendTo( "#Recipe-container" );
                $.fancybox.update()
            }
            return false;
        });
        $('body').on('click', '.remove-recipe-block', function (e) {
            $(this).parents('.recipe-block').remove();
            return false;
        });

        $('body').on('click', '.add-leftover', function (e) {
            if($.trim($("#Leftover-container").html()) == ""){
                var blockIndex = 0;
            }
            else{
                var blockIndex = $("#Leftover-container > div:last-child").data('block_index');
            }
            if(blockIndex != undefined){
                $.tmpl( "jq-new_leftover_block", { "blockIndex" : blockIndex+1 }).appendTo( "#Leftover-container" );
                $.fancybox.update()
            }
            return false;
        });
        $('body').on('click', '.remove-leftover-block', function (e) {
            $(this).parents('.leftover-block').remove();
            return false;
        });

        $('body').on('click', '.add-graze', function (e) {
            if($.trim($("#Graze-container").html()) == ""){
                var blockIndex = 0;
            }
            else{
                var blockIndex = $("#Graze-container > div:last-child").data('block_index');
            }
            if(blockIndex != undefined){
                $.tmpl( "jq-new_graze_block", { "blockIndex" : blockIndex+1 }).appendTo( "#Graze-container" );
                $.fancybox.update()
            }
            return false;
        });
        $('body').on('click', '.remove-graze-block', function (e) {
            $(this).parents('.graze-block').remove();
            return false;
        });

        $('body').on('click', '.add-other', function (e) {
            if($.trim($("#Other-container").html()) == ""){
                var blockIndex = 0;
            }
            else{
                var blockIndex = $("#Other-container > div:last-child").data('block_index');
            }
            if(blockIndex != undefined){
                $.tmpl( "jq-new_other_block", { "blockIndex" : blockIndex+1 }).appendTo( "#Other-container" );
                $.fancybox.update()
            }
            return false;
        });
        $('body').on('click', '.remove-other-block', function (e) {
            $(this).parents('.other-block').remove();
            return false;
        });

        $('body').on('click', '.prep-create', function (e) {
            /*  var that = this;
             $.ajax({
             url: ajaxurl,
             method: 'post',
             dataType: 'json',
             data: {
             'action': 'editPrep'
             },
             success: function () {
             $('#prep-edit-block-' + $(that).attr('day')).show();
             $('#week_' + $(that).attr('day') + '_Prep').show();
             $(that).hide();

             },
             error: function (jqXHR, textStatus, errorThrown) {
             processingError(jqXHR);
             }
             });
             */

            var day = $(this).attr('day');

            var postId = $('#post_id').val();
            var weekDay = $(this).attr('day');
            var dayAction = $(this).data('day_action');

            var currentWeekDate = encodeURIComponent($('#pp_list_week').val());
            var mealNumber = $("#"+weekDay+"_"+dayAction+"_MealNumb").val();

            if (mealNumber =='none'){
                mealNumber = '';
            }
            $('#mealEdited_'+dayAction+'_'+mealNumber).val(1);
            $('#meal-number-'+mealNumber).addClass('edited-color');
            $('#meal-type-'+mealNumber).addClass('edited-color');

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'edit_prep_popup',
                    postId: postId,
                    weekDay: weekDay,
                    dayAction: dayAction,
                    currentWeekDate: currentWeekDate,
                    mealNumber: mealNumber,
                    frontend: 1
                },
                dataType: 'json',
                beforeSend: function(){
                    $.fancybox.helpers.overlay.open({parent: 'body'});
                    $.fancybox.showLoading();
                },
                success: function(data){
                    $.fancybox.helpers.overlay.close();
                    if(data.success && data.html){
                        $.fancybox(data.html, {
                            transitionIn: 'none',
                            transitionOut: 'none',
                            centerOnScroll: true,
                            helpers: {
                                overlay: {
                                    css: {
                                        'background': 'rgba(58, 42, 45, 0.95)'
                                    }
                                }
                            },
                            afterShow: function(){
                                initJQTemplates();
                            }
                        });
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                    $.fancybox.helpers.overlay.close();
                    $.fancybox.hideLoading();
                }
            });

            return false;
        });

        $('body').on('change', '#pp_list_week', function (e)
        {
            var weekDate = $(this).val();

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'getUserWeek',
                    weekDate: weekDate
                },
                beforeSend: function () {
                    $.fancybox.helpers.overlay.open({parent: 'body'});
                    $.fancybox.showLoading();
                },
                success: function (data) {
                    $.fancybox.hideLoading();
                    $.fancybox.helpers.overlay.close();
                    if (data && data.success && data.success == 1 && data.html && data.html != undefined){
                        $('#pp_plan_form').replaceWith(data.html);
                        if (data.url != undefined){
                            history.replaceState(null, null, data.url);
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    processingError(jqXHR);
                    $.fancybox.close();
                }
            });
        });

        //function
        function updateEditPopup() {
            if ($('#popupForm').length > 0) {
                var postId = $('#post_id').val();
                var weekDay = $('#pp_days').val();
                var dayAction = $('#pp_meals').val();
                var currentWeekDate = encodeURIComponent($('#pp_week').val());
                var mealNumber = $("#" + weekDay + "_" + dayAction + "_MealNumb").val();

                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'edit_popup',
                        postId: postId,
                        weekDay: weekDay,
                        dayAction: dayAction,
                        currentWeekDate: currentWeekDate,
                        mealNumber: mealNumber,
                        frontend: 1
                    },
                    beforeSend: function () {
                        if (!$('#popupForm #mealplan-loading').length) {
                            $.fancybox.showLoading();
                            $('#popupForm').append('<div class="dialog-for-glide"></div>');
                        }
                    },
                    success: function (data) {
                        $('#meal-number').html('Meal # ' + mealNumber);
                        if (data.success && data.html) {
                            $('#popupForm .content').replaceWith($('.content', data.html));

                            initJQTemplates();
                        }
                        $('#popupForm .dialog-for-glide').remove();
                        $.fancybox.hideLoading();
                        $.fancybox.update();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        processingError(jqXHR);
                        $.fancybox.close();
                    }
                });
            }
        }

        function initJQTemplates(){
            $('#jq-new_recipe_block').template('jq-new_recipe_block');
            $('#jq-new_leftover_block').template('jq-new_leftover_block');
            $('#jq-new_graze_block').template('jq-new_graze_block');
            $('#jq-new_other_block').template('jq-new_other_block');
        }

        function submitPrepPopUp() {
            var err = false;
            var validator = $("#popupForm").validate({errorLabelContainer: "#errors", wrapper: "li"});

            if (!$('#popupForm').valid()) {
                return false;
            }
            var formData = $("#popupForm").serialize();
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    action: 'submitPrepPopUp',
                    weekDay:$("#popupForm").data('weekDay'),
                    save_popup: 'true',
                    currentWeekDate: encodeURIComponent($('#current_week_date').val()),
                    formData: formData
                },
                success: function (data) {
                    if (data && data.success && data.success == 1 && data.html != undefined){
                        $('#pp_plan_form').replaceWith(data.html);
                        if (data.redirectUrl != undefined) {
                            window.location = data.redirectUrl;
                        }
                    }
                    $.fancybox.close();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    /*processingError(jqXHR);*/
                    $.fancybox.close();
                }
            });
        }

        function submitPopUp() {
            var err = false;
            var validator = $("#popupForm").validate({errorLabelContainer: "#errors", wrapper: "li"});

            if (!$('#popupForm').valid()) {
                return false;
            }
            $('.field-error').remove();
            if ($('.recipe_leftovers_dd').length > 0) {
                var err1 = checkRecipeDd('recipe_leftovers_dd', 'Recipe')
                if (err1) {
                    err = true;
                }
            }

            if ($('.recipe_categories_dd').length > 0) {
                var err2 = checkRecipeDd('recipe_categories_dd', 'Category');
                if (err2) {
                    err = true;
                }
            }

            if ($('.recipe_recipes_dd').length > 0) {
                var err3 = checkRecipeDd('recipe_recipes_dd', 'Recipe');
                if (err3) {
                    err = true;
                }
            }

            if ($('.other-block-row').length > 0) {
                var err4 = checkOtherBlocks();
                if (err4) {
                    err = true;
                }
            }

            if ($('.graze-block-row').length > 0) {
                var err5 = checkGrazeBlocks();
                if (err5) {
                    err = true;
                }
            }

            if (err) {
                return false;
            }
            var formData = $("#popupForm").serialize();
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    action: 'submitAllComponentsPopUp',
                    weekDay:$("#popupForm").data('weekDay'),
                    save_popup: 'true',
                    currentWeekDate: encodeURIComponent($('#current_week_date').val()),
                    formData: formData
                },
                success: function (data) {
                    if (data && data.success && data.success == 1 && data.html != undefined){
                        $('#pp_plan_form').replaceWith(data.html);
                        if (data.redirectUrl != undefined) {
                            window.location = data.redirectUrl;
                        }
                    }
                    $.fancybox.close();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    processingError(jqXHR);
                    $.fancybox.close();
                }
            });
        }

        function loadRecipesByCategory(action, elem) {
            var categoryId = $(elem).val(),
                blockIndex = $(elem).attr('recipeBlock'),
                weekDay = $('#pp_days').val(),
                dayAction = $('#pp_meals').val(),
                currentWeekDate = $('#pp_week').val();

            if (action == 'getRecipeListByCategory') {
                var dayActionPart = 'Recipe';
                replacementBlock = '#choice-recipe-';
            }
            else {
                var dayActionPart = 'Leftover';
                replacementBlock = '#leftovers-choice-recipe-';
            }
            var parent = $(elem).parents('tbody');
            var recipesWrapper =  parent.find(replacementBlock + blockIndex);

            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': action,
                    'categoryId': categoryId,
                    'blockIndex': blockIndex,
                    'weekDay': weekDay,
                    'dayAction': dayAction,
                    'dayActionPart': dayActionPart,
                    'currentWeekDate': currentWeekDate,
                    'isFrontend': 1
                },
                success: function (data) {
                    if (data.html != undefined) {
                        recipesWrapper.html(data.html);
                        if(recipesWrapper.find('option').length == 1){
                            if(!parent.find('.field-warning').length){
                                if(categoryId=='FavoriteRecipes'){
                                    parent.append('<tr><td colspan="4"><span class="field-warning">You have not saved any favorite recipes.  You can do this by clicking, "Add this recipe to your favorites" on any recipe page.</span></td></tr>');
                                }else{
                                    parent.append('<tr><td colspan="4"><span class="field-warning">There are no recipes of this category in Meal Plans of the current and previous weeks.</span></td></tr>');
                                }

                            }
                        }
                        else{
                            parent.find('.field-warning').remove();
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    processingError(jqXHR);
                }
            });
        }

        function checkGrazeBlocks() {
            var err = false;
            $('.graze-block-row').each(function (index) {
                var el = $(this).find('[type=text]');
                if ($(el).val() == '') {
                    $(el).parent().append('<div class="field-error">Please input Graze </div>');
                    err = true;
                }
            });
            return err;
        }

        function checkOtherBlocks() {
            var err = false;
            $('.other-block-row').each(function (index) {
                var el = $(this).find('[type=text]');
                var nextCheckbox = $(el).parent().parent().parent().next().find('[type=checkbox]');
                if ($(el).val() == '') {
                    $(el).parent().append('<div class="field-error">Field is empty</div>');
                    err = true;
                    if (!$(nextCheckbox).is(':checked')) {
                        $(nextCheckbox).parent().append('<div class="field-error">Please check </div>');
                        err = true;
                    }
                }
                var chkBox = $(this).find('.show-other-prep_instructions');

                if ($(chkBox).length > 0 && $(chkBox).is(':checked')) {

                    var sel = $(chkBox).parent().next().find('select')
                    if ($(sel).find('option:selected').val() == '') {
                        $(sel).parent().append('<div class="field-error">Please select prep day</div>');
                        err = true;
                    }
                    else {
                        var textarea = $(sel).parent().parent().next().find('textarea');
                        if ($(textarea).val() == '') {
                            $(textarea).parent().append('<div class="field-error">Please enter Instructions</div>');
                            err = true;
                        }
                    }
                }

            });
            return err;
        }

        function checkRecipeDd(dd_class, name) {
            var err = false;

            $('.' + dd_class).each(function (index) {
                if ($(this).find('option:selected').val() == '') {
                    $(this).parent().append('<div class="field-error">Please select ' + name + ' </div>');
                    err = true;
                }
                var chkBox = $(this).parent().parent().next().find('[type=checkbox]');

                if ($(chkBox).length > 0 && $(chkBox).is(':checked')) {
                    var sel = $(chkBox).parent().next().find('select')
                    if ($(sel).find('option:selected').val() == '') {
                        $(sel).parent().append('<div class="field-error">Please select prep day</div>');
                        err = true;
                    }
                    else {
                        var textarea = $(sel).parent().parent().next().find('textarea');
                        if ($(textarea).val() == '') {
                            $(textarea).parent().append('<div class="field-error">Please enter Instructions</div>');
                            err = true;
                        }
                    }
                }
            });
            return err;
        }

        function deleteMeal(dayAction, weekDay){
            var postId = $('#post_id').val();
            var currentWeekDate = encodeURIComponent($('#current_week_date').val());
            if(weekDay == undefined){
                weekDay = [];
            }

            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'deleteMeal',
                    'dayAction': dayAction,
                    'weekDay': weekDay,
                    'postId': postId,
                    'currentWeekDate': currentWeekDate
                },
                beforeSend: function(){
                    $.fancybox.helpers.overlay.open({parent: 'body'});
                    $.fancybox.showLoading();
                },
                success: function (data) {
                    $.fancybox.hideLoading();
                    $.fancybox.helpers.overlay.close();
                    if (data.success && data.success == 1 && data.html != undefined){
                        $('#pp_plan_form').replaceWith(data.html);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                    $.fancybox.hideLoading();
                    $.fancybox.helpers.overlay.close();
                }
            });

        }

        function processingError(data){
            if(data.errors){
                $.each(data.errors, function(i){
                    alert(data.errors[i]);
                });
            }
            if (data.status == 403 && data.responseJSON && data.responseJSON.redirectTo) {
                window.location = data.responseJSON.redirectTo;
            }
        }

        $('body').on('click', '.add_allergies_dtn' , function (e) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'allergies_popup'
                },
                dataType: 'json',
                success: function(data){
                    if (data && data.success && data.success == 1 && data.table != undefined){
                        $('#allergies-table').replaceWith(data.table);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                    $.fancybox.helpers.overlay.close();
                    $.fancybox.hideLoading();
                }
            });
            return false;
        });

        $('body').on('click', '#submit-allergies-popup', function (e) {

            var allergies = $('.allergies-items input:checked');
            var allergens = [];
            $(allergies).each(function(element,val){
                allergens.push($(val).val());
            });

            if(allergens!=[]){
                $.ajax({
                    url: ajaxurl,
                    method: 'post',
                    dataType: 'json',
                    data: {
                        action: 'add_allergies_item',
                        item: allergens
                    },
                    success: function (data) {
                        if (data && data.success && data.success == 1 && data.table != undefined){
                            $('#allergies-table').replaceWith(data.table);
                            $('.delete_all_allergies_dtn').css('display','block');
                            $(allergies).each(function(element,val){
                                $(val).parent().remove();
                            });
                            //$('.allergies-items-buttons').css('display','none');
                            //$('.allergies-items').html('');
                            //$('.allergies-input').val('');
                        }
                        $.fancybox.close();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        processingError(jqXHR);
                        $.fancybox.close();
                    }
                });
            }
            return false;
        });

        $('body').on('click', '#cancel-allergies-popup', function (e) {
            $.fancybox.close();
            return false;
        });


        $('body').on('keyup', '.allergies-input', function (e){
            $('.allergies-items').html('');
            if(($(this).val()).trim() == ''){
                $('.allergies-items-buttons').css('display','none');
                return;
            }
            else{
                $('.allergies-items-buttons').css('display','block');
            }
            var table_items = $('.allergen-table-item');
            var added_allergens = [];
            $(table_items).each(function(element,val){
                added_allergens.push($(val).text());
            });
console.log(added_allergens);
            var in_base = false;
            for(var i = 0 ; i<(phpVars.ingredient_names).length ; i++){
                if( (phpVars.ingredient_names)[i].toLowerCase() == ($(this).val()).trim().toLowerCase() ){
                    in_base = true;
                }
                if((phpVars.ingredient_names)[i].toLowerCase().indexOf(($(this).val()).trim().toLowerCase()) > -1){

                    if($.inArray((phpVars.ingredient_names)[i],added_allergens) < 0){
                        $('.allergies-items').append('<div><input type="checkbox" value="'+(phpVars.ingredient_names)[i]+'"/>'+(phpVars.ingredient_names)[i]+'</div>');
                    }
                }
            }
            if(!in_base){
                $('.allergies-items').append('<div><input type="checkbox" value="'+$(this).val()+'"/>'+$(this).val()+'</div>');
            }
        });
        $('body').on('click', '.remove-allergies-item', function (e){
            var item_name = $(this).attr('ingredient_name');
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'remove_allergies_item',
                    'item': item_name
                },
                success : function (data) {
                    if (data && data.success && data.success == 1 && data.table != undefined){
                        $('#allergies-table').replaceWith(data.table);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                }
            });
        });
        $('body').on('click', '.remove-all-allergies-item', function (e){
            var item_name = $(this).attr('ingredient_name');
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'remove_allergies_item',
                    'item': item_name
                },
                success : function (data) {
                    if (data && data.success && data.success == 1 && data.table != undefined){
                        $('#allergies-table').replaceWith(data.table);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                }
            });
        });

        $('body').on('click', '.select_all_allergies_dtn', function (e){
            var allergies = $('.allergies-items input');
            $(allergies).attr('checked','on');
        });
        $('body').on('click', '.clear_all_allergies_dtn', function (e){
            var allergies = $('.allergies-items input');
            $(allergies).attr('checked',false);
        });

        $('body').on('click', '.delete_all_allergies_dtn', function (e){
            if(confirm('Are you sure you want to remove all items from list&')){
                $.ajax({
                    url: ajaxurl,
                    method: 'post',
                    dataType: 'json',
                    data: {
                        'action': 'remove_all_allergies_item'
                    },
                    success : function (data) {
                        if (data && data.success && data.success == 1){
                            $('#allergies-table').html('');
                            $('.delete_all_allergies_dtn').css('display','none');
                        }
                    },
                    error: function( jqXHR, textStatus, errorThrown){
                        processingError(jqXHR);
                    }
                });
            }
        });

        $('.submit_unit_option').on('click',function(){
            var unit_system = $("input[name=unit_option]:checked").val();
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'save_unit_option',
                    'unit_system': unit_system
                },
                success : function (data) {
                    show_saved('#saved-us-metric');
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                }
            });
        });

        $('.submit_user_weeks_number').on('click',function(){
            var select_number = $(".select_user_weeks_number").val();
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'save_user_weeks_number',
                    'user_weeks_number': select_number
                },
                success : function (data) {
                    show_saved('#saved-weeks-number');
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                }
            });
        });
        $(".select_user_weeks_number").on('change',function(){
            hide_saved('#saved-weeks-number');
        });
        $("input[name=unit_option]").on('change',function(){
            hide_saved('#saved-us-metric');
        });
        function hide_saved(block){
            $(block).hide();
        }
        function show_saved(block){
            $(block).show();
        }

        $('.select_week').on('change', function(){
            var select_week = $(".select_week").val();
            $('.week-'+select_week)[0].click();
        });
        $('.select_list').on('change', function(){
            var select_week = $(".select_list").val();
            $('.list-'+select_week)[0].click();
        });

        $('.send_email_icon').on('click',function(){
            var week_id = $(this).attr('week');
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'email_shopping_list',
                    'week_id': week_id
                },
                success : function (data) {
                   if(data==true){
                       alert('Email has been sent.');
                   }
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                }
            });
        });

        $('.submit_user_servings_number').on('click',function(){
            var select_number = $(".select_user_servings_number").val();
            $.ajax({
                url: ajaxurl,
                method: 'post',
                dataType: 'json',
                data: {
                    'action': 'save_user_servings_number',
                    'user_servings_number': select_number
                },
                success : function (data) {
                    show_saved('#saved-servings-number');
                },
                error: function( jqXHR, textStatus, errorThrown){
                    processingError(jqXHR);
                }
            });
        });
        $('body').on('click', '.servings-icon-question' ,function(){
            alert('The number of servings are not always 1 to 1 with number of people.  Sometimes we add extra servings to bulk up a meal, or to provide leftovers for lunch.');
        });

    });
})(jQuery);