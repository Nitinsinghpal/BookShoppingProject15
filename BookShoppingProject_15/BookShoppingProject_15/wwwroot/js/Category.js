var dataTable;

$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url" : "/Admin/Category/GetAll"
        },
        "columns": [
            { "data": "name", "width": "70%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                            <div class="text-center">
                            <a class="btn btn-info" href="/Admin/Category/Upsert/${data}"
                             <i class="fas fa-edit"></i>Edit
                            </a>
                            <a class="btn btn-danger" onclick=Delete("/Admin/Category/Delete/${data}")
                             <i class="fas fa-trash-alt"></i>Delete
                            </a>
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
        title: "Want to Delete Data",
        text: "Delete Information",
        buttons: true,
        icon: "warning",
        dangerModel : true
    }).then((willdelete) => {
        if (willdelete) {
            $.ajax({
                url: url,
                type: "delete",
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