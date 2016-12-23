$(function() {

    var g_table = $("table.data");
    var data_url = 'data.php?action=init_data_list';

    $.get(data_url, function(data) {

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
        var add_btn = $("<a class='optLink' href='javascript:;'>添加&nbsp;</a>");
        var opt_td = $("<td></td>");

        $(del_btn).attr('dataid', data_item['id']);
        $(del_btn).click(delHandler);

        $(opt_td).append(del_btn);
        $(opt_td).append(add_btn);

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
        
        confirmBtn.click(function (){
            var currentRow = $(this).parent().parent();
            var input_field = currentRow.find('input');
            var post_field = {}
            for (var i = 0, j = input_field.length; i < j; i++) {
                post_field['col_' + i] = input_field[i].value;
            }
            $.post("data.php?action=add_row", post_field, function (res){
               
            });
        });
        
        var cancelBtn = $("<a href='javascript:;' class='optLink'>取消&nbsp;</a>");
        
        cancelBtn.click(function (){
            $(this).parent().parent().remove('tr');
        });

        col_opt.append(confirmBtn);
        col_opt.append(cancelBtn);

        addRow.append(col_opt);
        g_table.append(addRow);
    });
    
    

});