(function ($) {

    $.fn.jGrid = function (options) {
        var element = this;

        // This is the easiest way to have default options.
        var settings = $.extend({
            //These are the defaults.
            url: '',
            columns: [],
            pageIndex: 1,
            totalPages: 1,
            rows: 10,
            width: element.width(),
            sortName: '',
            sortOrder: 'asc',
            pageSizes: []
        }, options);

        var strHtml = '';
        var overlayHtml = '<div class="overlay" style="display:none;"></div>';
        var loadingHtml = '<div class="loading">Loading..</div>';
        var strHeaderHtml = '<div class="divTable hdiv" style="width:' + settings.width + 'px;">';

        var strFooterHtml = '';

        //Create header
        if (settings.columns.length > 0) {
            var pecentageWidth = settings.width / 100;

            strHeaderHtml += '<div class="divRow">';
            for (var i = 0; i < settings.columns.length; i++) {
                if (settings.columns[i].sortable != null && !settings.columns[i].sortable) {
                    strHeaderHtml += '<div class="divCell" sidx="' + settings.columns[i].index + '" style="width:' + (settings.columns[i].width * pecentageWidth) + 'px;">' + settings.columns[i].title + '</div>';
                } else {
                    strHeaderHtml += '<div class="divCell sortable" sidx="' + settings.columns[i].index + '" style="width:' + (settings.columns[i].width * pecentageWidth) + 'px;">' + settings.columns[i].title;
                    if (settings.columns[i].index == settings.sortName) {
                        if (settings.sortOrder == 'asc') {
                            strHeaderHtml += '<span class="down">&darr;</span>';
                            strHeaderHtml += '<span class="up disabled">&uarr;</span>';
                        }
                        else {
                            strHeaderHtml += '<span class="down disabled">&darr;</span>';
                            strHeaderHtml += '<span class="up">&uarr;</span>';
                        }
                    }
                    else {
                        strHeaderHtml += '<span class="down disabled">&darr;</span>';
                        strHeaderHtml += '<span class="up disabled">&uarr;</span>';
                    }
                    strHeaderHtml += '</div>';
                }
            }
            strHeaderHtml += '</div>';
            strHeaderHtml += '</div>';

            strFooterHtml += '<div class="divTable bdiv" style="width:' + settings.width + 'px;">';
            strFooterHtml += '<div class="divRow">';
            strFooterHtml += '<div class="divCell" style="width:35%;"></div>';
            strFooterHtml += '<div class="divCell" style="width:30%; text-align: center;">';
            strFooterHtml += '<a class="first" href="javascript:void(0);">&laquo;</a>';
            strFooterHtml += '<a class="previous" href="javascript:void(0);">&lsaquo;</a>';
            strFooterHtml += 'Page&nbsp;<input type="text" class="pageIndex" maxlength="5" style="width:30px;" value="' + settings.pageIndex + '" />&nbsp;of&nbsp';
            strFooterHtml += '<span class="pages">' + settings.totalPages + '</span>&nbsp;';

            if (settings.pageSizes.length > 0) {
                strFooterHtml += '<select class="pageSize" style="width:50px;" >';

                for (var l = 0; l < settings.pageSizes.length; l++) {

                    if (settings.pageSizes[l] == settings.rows) {
                        strFooterHtml += '<option value="' + settings.pageSizes[l] + '" selected="selected">' + settings.pageSizes[l] + '</option>';
                    } else {
                        strFooterHtml += '<option value="' + settings.pageSizes[l] + '">' + settings.pageSizes[l] + '</option>';
                    }
                }

                strFooterHtml += '</select>';
            }

            strFooterHtml += '<a class="next" href="javascript:void(0);">&rsaquo;</a>';
            strFooterHtml += '<a class="last" href="javascript:void(0);">&raquo;</a>';
            strFooterHtml += '</div>';
            strFooterHtml += '<div class="divCell" style="width:35%; text-align: right;"><span class="records"></span></div>';
            strFooterHtml += '</div>';
            strFooterHtml += '</div>';
        }

        strHtml += overlayHtml + loadingHtml + strHeaderHtml + strFooterHtml;

        element.html(strHtml);

        var toggleBottomIcons = function () {
            element.find("div.bdiv a").removeClass('disabled');

            if (settings.pageIndex <= 1) {
                element.find("div.bdiv a.previous, div.bdiv a.first").addClass('disabled');
            }

            if (settings.pageIndex >= settings.totalPages) {
                element.find("div.bdiv a.next, div.bdiv a.last").addClass('disabled');
            }
        };

        var fireEvents = function () {

            //Add sort functionality
            element.find("div.hdiv div.sortable").click(function () {
                if (settings.sortName != $(this).attr('sidx')) {
                    settings.sortName = $(this).attr('sidx');
                    settings.sortOrder = "asc";
                } else {
                    settings.sortOrder = settings.sortOrder == "asc" ? "desc" : "asc";
                }

                //set sort icon
                element.find("div.hdiv span").addClass('disabled');

                if (settings.sortOrder == "asc") {
                    $(this).find("span.down").removeClass('disabled');
                } else {
                    $(this).find("span.up").removeClass('disabled');
                }

                settings.pageIndex = 1;

                load();
            });

            //Add page index change 
            element.find("div.bdiv input.pageIndex").keypress(function (e) {
                if (e.keyCode === 13) { // 13 is enter key
                    if ($(this).val() < 1) {
                        settings.pageIndex = 1;
                    } else if ($(this).val() > settings.totalPages) {
                        settings.pageIndex = settings.totalPages;
                    } else {
                        settings.pageIndex = $(this).val();
                    }

                    load();
                    return false;
                } else {
                    return true;
                }
            }).keyup(function() {
                this.value = this.value.replace(/[^0-9\.]/g, '');
            });

            //Add page size change functionality
            element.find("div.bdiv select.pageSize").change(function () {
                settings.pageIndex = 1;
                settings.rows = parseInt($(this).val());
                load();
            });

            //Next
            element.find("div.bdiv a.next").click(function () {
                if (!$(this).hasClass('disabled')) {
                    settings.pageIndex += 1;
                    load();
                }
            });

            //Previous
            element.find("div.bdiv a.previous").click(function () {
                if (!$(this).hasClass('disabled')) {
                    settings.pageIndex -= 1;
                    load();
                }
            });

            //First
            element.find("div.bdiv a.first").click(function () {
                if (!$(this).hasClass('disabled')) {
                    settings.pageIndex = 1;
                    load();
                }
            });

            //Last
            element.find("div.bdiv a.last").click(function () {
                if (!$(this).hasClass('disabled')) {
                    settings.pageIndex = settings.totalPages;
                    load();
                }
            });
        };

        //Set overlay and loading div height wnd width
        var setOverlayHeightWidth = function () {
            var tablePosition = element.find('.divTable').position();
            element.find('.overlay').width(element.find('.divTable').width() + 1).height(element.height());
            element.find('.overlay').css({ 'left': tablePosition.left, 'top': tablePosition.top });
            element.find('.loading').css({
                'left': tablePosition.left + (element.find('.divTable').width() / 2 - 30),
                'top': tablePosition.top + (element.height() / 2 - 10)
            });
        };

        //To show page summary
        var showPageInfo = function (totalRecords) {
            element.find("div.bdiv input.pageIndex").val(settings.pageIndex);
            element.find('div.bdiv span.pages').html(settings.totalPages);

            if (totalRecords > 0) {
                var startRecord = ((settings.pageIndex - 1) * settings.rows);
                var endRecord = startRecord + settings.rows < totalRecords ? startRecord + settings.rows : totalRecords;
                element.find('div.bdiv span.records').html('Records ' + (startRecord + 1) + ' - ' + endRecord + ' of ' + totalRecords);
            }
            else {
                element.find('div.bdiv span.records').html('No records found');
            }
        };

        var load = function () {
            $.ajax({
                url: settings.url + '?sidx=' + settings.sortName + '&sord=' + settings.sortOrder + '&page=' + settings.pageIndex + '&rows=' + settings.rows,
                dataType: "json",
                type: "get",
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    element.find('.overlay').show();
                    element.find('.loading').show();
                },
                success: function (data, st) {
                    if (st == 'success') {
                        element.find('.overlay').hide();
                        element.find('.loading').hide();

                        if (data.d != null) {
                            data = data.d;
                        }

                        if (data != null) {
                            element.find("div.divBody").remove();
                            settings.totalPages = data.totalPages;
                            toggleBottomIcons();

                            var strBodyHtml = '<div class="divTable divBody" style="width:' + settings.width + 'px;">';

                            for (var j = 0; j < data.rows.length; j++) {
                                strBodyHtml += '<div class="divRow">';
                                for (var k = 0; k < settings.columns.length; k++) {
                                    var cellStyle = 'width:' + (settings.columns[k].width * pecentageWidth) + 'px;' +
                                        (settings.columns[k].align != null ? 'text-align:' + settings.columns[k].align : "");
                                    var cellValue = data.rows[j][settings.columns[k].index] != null ?
                                        data.rows[j][settings.columns[k].index] :
                                        settings.columns[k].formatter != null ?
                                        settings.columns[k].formatter(data.rows[j]) : "";
                                    strBodyHtml += '<div class="divCell" style="' + cellStyle + '">' + cellValue + '</div>';
                                }

                                strBodyHtml += '</div>';
                            }

                            strBodyHtml += '</div>';
                            element.find("div.bdiv").before(strBodyHtml);
                            showPageInfo(data.totalRecords);
                            setOverlayHeightWidth();
                        }
                    }
                },
                error: function () {
                    alert('Data retrieve failed.');
                }
            });
        };

        setOverlayHeightWidth();
        fireEvents();
        load();
    };

} (jQuery));