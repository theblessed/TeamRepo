<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="GridImplementation2010.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="http://code.jquery.com/jquery-1.10.1.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="Scripts/jgrid-1.0.js"></script>
    <link href="Styles/jgrid.css" rel="stylesheet" />
    <script type="text/javascript">
        $(function () {
            $("#divGrid").jGrid({
                url: '/Service1.svc/GetPersons',
                columns: [
                    { title: "First Name", index: "FirstName", width: '20' },
                    { title: "Last Name", index: "LastName", width: '20' },
                    { title: "Birth Date", index: "DateOfBirth", width: '20', align: 'center', sortable: false },
                    { title: "Age", index: "Age", width: '10' },
                    { title: "Gender", index: "Gender", width: '10' },
                    { title: "Edit", index: "Edit", width: '10', align: 'center', sortable: false, formatter: editLink },
                    { title: "Delete", index: "Delete", width: '10', align: 'center', sortable: false, formatter: deleteLink }
                ],
                width: '1000',
                pageSizes: [5, 10, 20, 30],
                rows: 10,
                sortName: 'Age',
                sortOrder: 'desc'
            });
        });

        function editLink(rowValue) {
            return '<a href="#">Edit</a>';
        }

        function deleteLink(rowValue) {
            return '<a href="#">Delete</a>';
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divGrid">
    
    </div>
    </form>
</body>
</html>
