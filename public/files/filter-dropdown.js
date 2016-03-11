WPUltimatePostGrid = WPUltimatePostGrid || {};

WPUltimatePostGrid.initFilterDropdown = function(container) {
    var grid_id = container.data('grid');
    var dropdowns = container.find('.wpupg-filter-dropdown-item');

    WPUltimatePostGrid.grids[grid_id].multiselect_type = container.data('multiselect-type');

    dropdowns.each(function() {
        var taxonomy = jQuery(this).data('taxonomy');

        jQuery(this).select2wpupg({
            allowClear: true
        }).on('change', function() {
            var terms = jQuery(this).val();
            if(terms) {
                if(!jQuery.isArray(terms)) terms = [terms];

                WPUltimatePostGrid.grids[grid_id].filters[taxonomy] = terms;
            } else {
                WPUltimatePostGrid.grids[grid_id].filters[taxonomy] = [];
            }

            WPUltimatePostGrid.filterGrid(grid_id);
        });
    });
};

WPUltimatePostGrid.updateFilterDropdown = function(container, taxonomy, terms) {
    container.find('#wpupg-filter-dropdown-' + taxonomy).select2wpupg('val', terms);
};