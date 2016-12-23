$(function() {

    var g_table = $("table.data");
    var data_url = 'data.php?action=init_data_list';

    $.get(data_url, function(data) { // 初始化get数据

        var row_items = $.parseJSON(data);

        for(var i = 0, j = row_items.length; i < j; i++) {
            var data_dom = create_row(row_items[i]);
            g_table.append(data_dom);
        }

    });

    function delHandler() {
        var data_id = $(this).attr('dataid');
        var meBtn = $(this);
        $.post("data.php?action=del_row", {
            dataid: data_id
        }, function(res) {
            if(res == 'ok') {
                $(meBtn).parent().parent().remove();
            } else {
                alert('删除失败...');
            }
        })
    }

    function editHandler() {
        var data_id = $(this).attr('dataid');
        var meBtn = $(this);
        var meRow = $(this).parent().parent();
        var editRow = $("<tr></tr>");

        // 往里面塞数据
        for(var i = 0; i < 8; i++) {
            var editTd = $("<td><input type='text' class='txtField' /></td>");
            var v = meRow.find('td:eq(' + i + ')').html();
            editTd.find('input').val(v);
            editRow.append(editTd);
        }

        var opt_td = $("<td></td>");
        var saveBtn = $("<a href='javascript:;' class='optLink'>保存&nbsp;</a>");

        saveBtn.click(function() {
            var currentRow = $(this).parent().parent();
            var input_field = currentRow.find('input');
            var post_field = {};
            for(var i = 0, j = input_field.length; i < j; i++) {
                post_field['col_' + i] = input_field[i].value; // input取了[i]之后就是普通的dom对象了，所以取值只能用value
            }
            post_field['id'] = data_id;
            $.post("data.php?action=edit_row", post_field, function(res) {
                if (res == "ok") {
                    var newUpdateRow = create_row(post_field);
                    currentRow.replaceWith(newUpdateRow);
                } else {
                    alert("数据更新失败...")
                }
            });
        });

        var cancelBtn = $("<a href='javascript:;' class='optLink'>取消&nbsp;</a>");

        cancelBtn.click(function() {
            var currentRow = $(this).parent().parent();
            meRow.find('a:eq(0)').click(delHandler);
            meRow.find('a:eq(1)').click(editHandler);
            currentRow.replaceWith(meRow); // meRow里面是没有事件的需要重新绑定事件
        });

        opt_td.append(saveBtn);
        opt_td.append(cancelBtn);
        editRow.append(opt_td);
        meRow.replaceWith(editRow);
    }

    function create_row(data_item) {
        var row_obj = $("<tr></tr>");
        for(var k in data_item) {
            if("id" != k) {
                var col_td = $("<td></td>");
                col_td.html(data_item[k]);
                row_obj.append(col_td);
            }
        }

        var del_btn = $("<a class='optLink' href='javascript:;'>删除&nbsp;</a>");

        del_btn.attr('dataid', data_item['id']);
        del_btn.click(delHandler);

        var edit_btn = $("<a class='optLink' href='javascript:;'>编辑&nbsp;</a>");

        edit_btn.attr('dataid', data_item['id']);
        edit_btn.click(editHandler);

        var opt_td = $("<td></td>");

        $(opt_td).append(del_btn);
        $(opt_td).append(edit_btn);

        row_obj.append(opt_td);
        return row_obj;
    }

    $("#addBtn").click(function() {
        var addRow = $("<tr></tr>");

        for(var i = 0; i < 8; i++) {
            var col_td = $("<td><input type='text' class='txtField' /></td>");
            addRow.append(col_td);
        }

        var col_opt = $("<td></td>");

        var confirmBtn = $("<a href='javascript:;' class='optLink'>确认&nbsp;</a>");

        confirmBtn.click(function() {
            var currentRow = $(this).parent().parent();
            var input_field = currentRow.find('input');
            var post_field = {}
            for(var i = 0, j = input_field.length; i < j; i++) {
                post_field['col_' + i] = input_field[i].value; // input取了[i]之后就是普通的dom对象了，所以取值只能用value
            }
            $.post("data.php?action=add_row", post_field, function(res) {
                if(res > 0) {
                    post_field['id'] = res;
                    var postAddRow = create_row(post_field);
                    currentRow.replaceWith(postAddRow);
                } else {
                    alert('插入失败...')
                }
            });
        });

        var cancelBtn = $("<a href='javascript:;' class='optLink'>取消&nbsp;</a>");

        cancelBtn.click(function() {
            $(this).parent().parent().remove('tr');
        });

        col_opt.append(confirmBtn);
        col_opt.append(cancelBtn);

        addRow.append(col_opt);
        g_table.append(addRow);
    });

});