(function($) {
    $(function() {
        $('.copy_colors').on('click',function(){

            if(confirm("Are you sure you'd like to use this color scheme for all pdf documents?")){
                var form = $(this).parent();
                var background_color = $(form).find('.background_color_input').val();
                var top_text_color = $(form).find('.top_text_color_input').val();
                var table_background_color = $(form).find('.table_background_color_input').val();
                var line_color = $(form).find('.line_color_input').val();
                var number_color_text = $(form).find('.number_color_text_input').val();
                var number_color_background = $(form).find('.number_color_background_input').val();


                $.ajax({
                    url: phpVars['ajaxurl'],
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        action: 'copy_colors',
                        background_color: background_color,
                        top_text_color: top_text_color,
                        table_background_color: table_background_color,
                        line_color: line_color,
                        number_color_text: number_color_text,
                        number_color_background: number_color_background
                    },
                    success: function (data) {
                        $('.background_color_input').val(background_color);
                        $('.top_text_color_input').val(top_text_color);
                        $('.table_background_color_input').val(table_background_color);
                        $('.line_color_input').val(line_color);
                        $('.number_color_text_input').val(number_color_text);
                        $('.number_color_background_input').val(number_color_background);

                        $('.selector1 div').css('background-color', background_color);
                        $('.selector2 div').css('background-color', top_text_color);
                        $('.selector3 div').css('background-color', table_background_color);
                        $('.selector4 div').css('background-color', line_color);
                        $('.selector5 div').css('background-color', number_color_text);
                        $('.selector6 div').css('background-color', number_color_background);


                        $('.meal_plan_form .preview_body').css('background-color',background_color);
                        $('.meal_plan_form .preview_body h1').css('color',top_text_color);
                        $('.meal_plan_form .preview_body .main_table').css('background-color',table_background_color);
                        $('.meal_plan_form .preview_body .main_table td').css('border','1px solid '+line_color);
                        $('.meal_plan_form .preview_body .main_table .meal-number').css('color',number_color_text);
                        $('.meal_plan_form .preview_body .main_table .meal-number').css('background-color',number_color_background);

                        $('.prep_list_form .preview_body').css('background-color',background_color);
                        $('.prep_list_form .preview_body h1').css('color',top_text_color);

                        $('.recipes_list_form .preview_body').css('background-color',background_color);
                        $('.recipes_list_form .preview_body h1').css('color',top_text_color);

                        $('.too_column_shopping_list_form .preview_body').css('background-color',background_color);
                        $('.too_column_shopping_list_form .preview_body h1').css('color',top_text_color);
                        $('.too_column_shopping_list_form .preview_body .main_table').css('background-color',table_background_color);
                        $('.too_column_shopping_list_form .preview_body .main_table').css('border','1px solid '+line_color);
                        $('.too_column_shopping_list_form .preview_body .main_table tr').css('border-bottom','1px solid '+line_color);

                        $('.one_column_shopping_list_form .preview_body').css('background-color',background_color);
                        $('.one_column_shopping_list_form .preview_body h1').css('color',top_text_color);
                        $('.one_column_shopping_list_form .preview_body .main_table').css('background-color',table_background_color);
                        $('.one_column_shopping_list_form .preview_body .main_table').css('border','1px solid '+line_color);
                        $('.one_column_shopping_list_form .preview_body .main_table tr').css('border-bottom','1px solid '+line_color);

                    }
                });

            }

        });

    });

})(jQuery);