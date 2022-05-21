var dataTable;

$(document).ready(function () {
    loadDataTable();
})
function loadDataTable() {
    dataTable = $("#tblData").DataTable({
        "ajax": {
            "url":"/admin/product/getall"
        },
        "columns": [
            {
                "data": "title",
                "width":"15%"
            },
            {
                "data": "description",
                "width": "15%"
            },
            {
                "data": "author",
                "width": "15%"
            },
            {
                "data": "isbn",
                "width": "15%"
            },
            {
                "data": "price",
                "width": "15%"
            },
            {
                "data": "id",
                "render": function (data) {
                    return `
                       <div class="text-center">
                    <a href="/Admin/product/upsert/${data}" class="btn btn-info"><i class="fas fa-edit"></i>Edit</a>
                    <a class="btn btn-danger" onclick=Delete("/Admin/product/Delete/${data}")><i class="fas fa-trash-alt"></i>Delete</a>
                    </div>
                        `;
                }
            }
        ]
    })
}
function Delete(url) {
    //alert(url);
    swal({
        title: "want to delete data",
        text: "Delete information",
        buttons: true,
        icon: "Warning",
        dangerModel:true
    }).then((willDelete)=>{
        if (willDelete) {
            $.ajax({
                url: url,
                type: "Delete",
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    })
}