
function LoadDashboard() {
    if ($.cookie('userMail')) {

        var userMail = $.cookie('userMail');
        var username = parseInt(userMail.indexOf("@"));
        $.ajax({
            method: "get",
            url: `public/pages/user_dashboard.html`,
            success: (response) => {
                $("section").html(response);

                $("#lblUser").html(userMail.slice(0, username));
                $.ajax({
                    method: 'get',
                    url: `https://wishlist-backend-p49k.onrender.com/appointment/${$.cookie('userMail')}`,
                    success: (appointments => {
                        appointments.map(appointment => {
                            $(`<div class="alert alert-success alert-dismissible col-12 col-sm-12 col-md-6 col-lg-4 mx-3" style="width:25rem;">
                               <h2>${appointment.title}</h2>
                               <p> ${appointment.description} </p>
                               <div class="bi bi-calendar"> ${appointment.date.slice(0, appointment.date.indexOf("T"))}</div>
                               <div class="mt-3">
                                  <button value=${appointment._id} class="bi bi-pen-fill btn btn-warning m-x2"  id="editAppointment"></button>
                                  <button value=${appointment._id} class="bi bi-trash btn btn-danger m-x2" id="deleteAppiontment" ></button>
                               </div>
                            </div>`).appendTo("#appointments");
                        })
                    })
                })
            }
        })

    } else {
        $.ajax({
            method: "get",
            url: `public/pages/${page_name}`,
            success: (response) => {
                $("section").html(response);
            }
        })
    }
}




function loadPage(page_name) {

    $.ajax({

        method: "get",
        url: `public/pages/${page_name}`,
        success: (response => {
            $("section").html(response);
        })

    })
}

$(() => {
    loadPage("home.html");

    $(document).on("click", "#newUser", () => {
        loadPage("register.html");
    });

    $(document).on("click", "#btnSignin", () => {
        loadPage("login.html");
    })


    $(document).on("click", "#btnRegister", () => {

        var newUser = {
            user_name: $("#user_name").val(),
            password: $("#password").val(),
            email: $("#email").val(),
            mobile: parseInt($("#mobile").val()),
        }

        $.ajax({
            method: "post",
            url: `https://wishlist-backend-p49k.onrender.com/user/register`,
            data: newUser,
            success: () => {
                alert("User register successfully");
                loadPage("login.html");
            },
            error: (xhr) => {
                if (xhr.status === 409) {
                    alert("This email is already registered.");
                } else {
                    alert("Registration failed. Please try again.");
                }
            }
        });



    });


    $(document).on("click", "#btnLogin", () => {

        var mail = $("#email").val();

        $.ajax({
            method: "get",
            url: `https://wishlist-backend-p49k.onrender.com/user/${mail}`,
            success: (userDetails) => {
                if (userDetails) {
                    if ($("#password").val() === userDetails.password) {
                        $.cookie("userMail", $("#email").val());
                        localStorage.setItem("user_id", `${userDetails._id}`)
                        LoadDashboard();
                    } else {
                        alert("invalid password");
                    }
                } else {
                    alert(" user not found");
                }
            },
            error: (xhr) => {
                alert("wrong credentials: " + xhr.responseText);
            }

        })

    })



    $(document).on("click", "#btnSignout", () => {
        $.removeCookie("userMail");
        localStorage.removeItem("user_id");
        loadPage("home.html");
    });

    $(document).on("click", "#btnNewAppointment", () => {
        loadPage("add_Appointment.html");

    });


    $(document).on("click", "#btnAdd", () => {

        var appointment = {
            title: $("#addtitle").val(),
            date: $("#adddate").val(),
            description: $("#adddescription").val(),
            email: $.cookie("userMail"),
            user_id: localStorage.getItem("user_id")
        }

        $.ajax({
            method: "post",
            url: `https://wishlist-backend-p49k.onrender.com/appointment`,
            data: appointment,
        })
        alert("successfully added")
        LoadDashboard()
    });

    $(document).on("click", "#cancelAdd", () => {
        LoadDashboard();
    })


    $(document).on("click", "#deleteAppiontment", (e) => {

        var choice = confirm("are you sure to delete?");

        if (choice === true) {
            $.ajax({
                method: "delete",
                url: `https://wishlist-backend-p49k.onrender.com/appointment/delete/${e.target.value}`,
            })

            alert("successfully deleted appointment");
        }
        LoadDashboard();
    });


    $(document).on("click", "#editAppointment", (e) => {

        loadPage("editAppointment.html");

        $.ajax({
            method: "get",
            url: `https://wishlist-backend-p49k.onrender.com/appointment/ap/${e.target.value}`,
            success: (appointment => {
                $("#title").val(appointment.title);
                $("#description").val(appointment.description);
                $("#date").val(appointment.date.slice(0, appointment.date.indexOf("T")));
                $("#mail").val(appointment.email);
                $("#user_id").val(appointment.user_id);
                $("#Id").val(appointment._id);
            })
        })

    })


    $(document).on("click", "#btnEditCancel", () => {
        LoadDashboard();
    })


    $(document).on("click", "#btnSave", (e) => {
        var appointment = {
            title: $("#title").val(),
            description: $("#description").val(),
            date: $("#date").val(),
            email: $("#mail").val(),
            user_id: $("#user_id").val(),
            _id: $("#Id").val(),
        }


        $.ajax({
            method: "put",
            url: `https://wishlist-backend-p49k.onrender.com/appointment/edit/${appointment._id}`,
            data: appointment,
            success: () => {
                alert("Successfully updated appointment");
                LoadDashboard();
            },
            error: (xhr) => {
                alert("Failed to update appointment: " + xhr.responseText);
            }
        });

    })

})
