     
<script>
    if (localStorage.getItem('darkMode') === "on") {
        $('.hideTrade1').removeClass("showTrade");
        applyDarkModeStyles();
    } else {
        $('.hideTrade2').removeClass("showTrade");
        applyLightModeStyles();
    }

    function applyDarkModeStyles() {
        // Create a style element
        var styleElement = document.createElement('style');
        // Add the CSS rules for dark mode
        styleElement.innerHTML = `
            .swal2-container.swal2-center > .swal2-popup {
                background-color: #121212 !important;
            }
            .swal2-html-container, .swal2-title {
                color: white !important;
            }
        `;
        // Append the style element to the document head
        document.head.appendChild(styleElement);
    }

    function applyLightModeStyles() {
        // Create a style element
        var styleElement = document.createElement('style');
        // Add the CSS rules for light mode
        styleElement.innerHTML = `
            .swal2-container.swal2-center > .swal2-popup {
                background-color: white !important;
            }
            .swal2-html-container, .swal2-title {
                color: black !important;
            }
        `;
        // Append the style element to the document head
        document.head.appendChild(styleElement);
    }
</script>


<script>
    // Check if 'darkMode' is in localStorage, and set default accordingly
    if (localStorage.getItem('darkMode') === null) {
        // 'darkMode' is not set, make dark the default
        document.body.classList.add("dark");

        // Additional initialization code for dark mode if needed

        document.addEventListener("DOMContentLoaded", function () {
            document.querySelector('.js-switch-theme input').checked = true;
        });
    } else {
        // 'darkMode' is set in localStorage, apply appropriate theme
        if (localStorage.getItem('darkMode') === "on") {
            document.body.classList.add("dark");
            
            document.addEventListener("DOMContentLoaded", function () {
                document.querySelector('.js-switch-theme input').checked = true;
            });
        } else {
            document.body.classList.remove("dark");
            
            // Additional initialization code for light mode if needed
        }
    }
</script>




<script>
    
    function withdrawController(url) {
    // Prevent default form submission
    event.preventDefault();

    Swal.fire({
        title: 'Please wait...',
        imageUrl: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
        imageAlt: 'Loader',
        showConfirmButton: false,
        allowOutsideClick: false,
        imageWidth: 40,
        imageHeight: 40,
         
    });

    // Serialize form data
    const formData = new FormData(document.querySelector('#formWithdraw'));

    fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': 'v8m81wQPi6xtIHcc936TT84RYsADOBfhKCsacCzF', // Assuming you are using Blade templating
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const message = data.message || 'Error processing API.';
        const withId = data.id;

        if (data.status_code === 200) {
            showCustomModal(message, withId);
        } else {
            showErrorModal(message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorModal('Error processing request');
    });
}

function depositController(url) {
    // Prevent default form submission
    event.preventDefault();

    Swal.fire({
        title: 'Please wait...',
        imageUrl: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
        imageAlt: 'Loader',
        showConfirmButton: false,
        allowOutsideClick: false,
        imageWidth: 40,
        imageHeight: 40,
    });

    // Serialize form data
    const formData = new FormData(document.querySelector('#formDeposit'));

    fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': 'v8m81wQPi6xtIHcc936TT84RYsADOBfhKCsacCzF',
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const message = data.message || 'Error processing API.';
        const finalamo = data.finalamo;
        const curname = data.curname;
        const walletAddress = data.walletAddress;
        const transactionId = data.id;
        const usercur = data.usercur;

        if (data.status_code === 200) {
            Swal.fire({
                html: `<div class="col-md-12" style="padding: 10px!important"><div class="my-4"><div class="popup-content"><p class="">Your deposit order of <strong class="text-primary fw-bold" style="color: #3a64d1!important;"> ${message} ${usercur}</strong> has been placed.</p> <br>
                <p>Please send <strong class="text-primary fw-bold" style="color: #3a64d1!important;"> ${finalamo} ${curname}</strong> to the address below. The amount will appear in your account only after transaction approved.</p><div class="gaps-1x"></div>
                    <center><div class="pay-wallet-address pay-wallet-eth">
                        <br>
                        <h6 class="font-bold text-center " style="font-size: 1.1rem!important;">Payment to the following ${curname} Wallet Address</h6><br>
                        <div class="row guttar-1px guttar-vr-15px">
                            
                            <div class="col-12">
                                <div class="fake-class pl-sm-3">
                                    <p class="text-center text-sm-left "><p>Send Amount:</p><br class=" d-sm-none">
                                        <h5 class="text-primary fw-bold"><strong class="fw-bold" style="color: #3a64d1!important;">${finalamo} ${curname} <i class="ki-duotone ki-copy fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></i> </strong><span class=" " id="copyBoardA"><span style="font-size:13px" class="copyTextA"></span></span></h5>
                                        
                                    
                                     
                               </p>
                                    <br>
                                    
                                    <a href="www.qr-code-generator.com/solutions/text-qr-code/" border="0" style="cursor:default" rel="nofollow"><img src="https://chart.googleapis.com/chart?cht=qr&chl=${walletAddress}&chs=180x180&choe=UTF-8&chld=L|2"></a>
                                    
                                    <br>
                                     <p class="text-center text-sm-left guttar-1px"><p>Wallet Address:</p></p>
                                    <div class="copy-wrap">
                        
                        <br>
                                
                                
                                <div class="popup__wrap">
    <div class="input-group">
        <input type="text" name="amount_withdraw" class="popup__input form-control form--control" id="copymoreURL" value="${walletAddress}" readonly>
        <button class="copyBoard1 input-group-text" style="background-color: #3a64d1; color: white;" onclick="copyWalletAddressToClipboard()"><i class="fa fa-copy" style="color: white;"></i></button>
    </div>
</div>

                                
                                
                                    
                                    
                                    </div>
                                                                                        </div>
                            </div>
                        </div>
                    </div> </center>
                             
                <div class="gaps-2x"></div>
               
                <div class="gaps-1x"></div>
               
                
               <div class="note note-danger note-plane">
                    <br><br>
                    <center><p><em class="fas fa-info-circle"></em> Kindly make sure to check that your are sending to above generated wallet address, to avoid loss of funds.</p></center>
                </div> 
            </div>
            
               
               
                                        
                                            </div>
            
                                        </div>`,
                confirmButtonText: 'Close',
                allowOutsideClick: false,
                confirmButtonColor: '#3a64d1',
                allowEscapeKey: false,
                showCancelButton: false,
                cancelButtonText: 'Cancel Transaction',
                cancelButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                } else {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'This will cancel the transaction!',
                        icon: 'warning',
                        showCancelButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonColor: '#3a64d1',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, cancel it!',
                        cancelButtonText: 'No, keep it'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            
                            const routeUrl = `deposit.html/cancel/:transactionId`.replace(':transactionId', transactionId);
                            
                            fetch(routeUrl, {
                                method: 'GET',
                                headers: {
                                    'X-CSRF-TOKEN': 'v8m81wQPi6xtIHcc936TT84RYsADOBfhKCsacCzF',
                                    'Content-Type': 'application/json',
                                },
                            })
                            .then(response => {
                                if (response.ok) {
                                    return response.json();
                                } else {
                                    throw new Error('Transaction cancellation failed');
                                }
                            })
                            .then(data => {
                                if (data.status_code === 200) {
                                    Swal.fire({
                                        icon: 'success',
                                        text: 'Transaction Cancelled Successfully!',
                                        confirmButtonText: 'OK',
                                        confirmButtonColor: '#3a64d1',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                    }).then((result) => {
                                        if (result.isConfirmed || result.isDismissed) {
                                            location.reload();
                                        }
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        text: 'Transaction Cancellation failed!',
                                        confirmButtonText: 'OK',
                                        confirmButtonColor: '#3a64d1',
                                        allowOutsideClick: true,
                                        allowEscapeKey: true,
                                    });
                                }
                            })
                            .catch(error => {
                                // Handle error response
                                Swal.fire({
                                    icon: 'error',
                                    text: 'Error Calling Api, Retry!',
                                    confirmButtonText: 'OK',
                                    confirmButtonColor: '#3a64d1',
                                    allowOutsideClick: true,
                                    allowEscapeKey: true,
                                });
                            });
                        }
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3a64d1',
                allowOutsideClick: true,
                allowEscapeKey: true,
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    // Handle error confirmation result
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);

        let errorMessage = "An unexpected error occurred. Please try again.";

        if (error.message) {
            errorMessage = error.message;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3a64d1',
            allowOutsideClick: true,
            allowEscapeKey: true,
        }).then((result) => {
            // Handle error confirmation result
            if (result.isConfirmed || result.isDismissed) {
                // Handle error confirmation result
            }
        });
    });
}

/*function copyWalletAddressToClipboard() {
    // Find the wallet address input element
    const walletAddressInput = document.getElementById('copymoreURL');

    walletAddressInput.select();
    walletAddressInput.setSelectionRange(0, 99999);

     
    document.execCommand("copy");

    // Provide visual feedback (you can use a library like Clipboard.js for a more modern approach)
    alert('Wallet Address Copied!');
}*/



function showCustomModal(message, withId) {
    Swal.fire({
        html: `
            <div class="col-md-12" style="padding: 10px!important">
                <div class="my-4">
                    <div class="popup-content">
                        <p style="font-size: 0.9rem;">Provide the below information and re-check the information before submitting. The withdrawal amount will be sent to the given information.</p>
                        <br>
                        <p style="font-size: 0.9rem;">So you've to ensure that the information is correct. Otherwise, the authority will not be responsible for any economic loss. The processing may take some time. Once the amount sends, the system's admin will approve the request.</p>
                        <div class="gaps-1x"></div>
                        <center>
                            <div class="pay-wallet-address pay-wallet-eth">
                                <br>
                                <div class="row guttar-1px guttar-vr-15px">
                                    <div class="col-12">
                                        <div class="fake-class pl-sm-3">
                                            <p class="text-center text-sm-left guttar-1px" style="font-size: 0.9rem;"><p>Please note, BULLCOPYTRADE will not be liable for any loss arising from YOU entering wrong withdrawal details</p></p>
                                            <div class="copy-wrap">
                                                <br>
                                                <div class="popup__wrap">
                                                    <form id="walletForm" autocomplete="off">
                                                        <label><strong>Your ${message} Wallet Address</strong></label>
                                                        <br>
                                                        <input type="text" step="any" name="wallet_address" class="popup__input form-control form--control" required>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </center>
                        <div class="gaps-2x"></div>
                        <div class="gaps-1x"></div>
                    </div>
                </div>
            </div>
        `,
        showCancelButton: false,
        confirmButtonText: 'Submit',
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: () => {
            const walletAddress = document.querySelector('#walletForm [name="wallet_address"]').value;

            return new Promise((resolve, reject) => {
                if (walletAddress.trim() !== '') {
                    Swal.showLoading();

                    const routeUrl = `withdraw.html/view-preview/:withId`.replace(':withId', withId);
                    console.log(routeUrl);
                    fetch(routeUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': 'v8m81wQPi6xtIHcc936TT84RYsADOBfhKCsacCzF',
                        },
                        body: JSON.stringify({ wallet_address: walletAddress }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.status_code == 200) {
                            Swal.fire({
                                icon: 'success',
                                text: 'Withdraw successful, kindly wait for approval!',
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#3a64d1',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                            }).then((result) => {
                                if (result.isConfirmed || result.isDismissed) {
                                       location.reload();
                                    }
                            });
                        } else {
                            showErrorModal(data.message);
                        }
                    })
                    .catch(error => {
                        reject('An unexpected error occurred. Please try again.');
                        console.error('Error:', error);
                    });
                } else {
                    reject('Please enter a valid wallet address');
                }
            });
        },
    })
    .then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            location.reload();
        }
    });
}


function showErrorModal(errorMessage) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3a64d1',
        allowOutsideClick: true,
        allowEscapeKey: true,
         
    });
}

function deleteController(deleteUrl) {
    Swal.fire({
        title: 'Please wait...',
        imageUrl: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
        imageAlt: 'Loader',
        showConfirmButton: false,
        allowOutsideClick: false,
        imageWidth: 40,
        imageHeight: 40,
         
    });


    fetch(deleteUrl, {
        method: 'GET',
        headers: {
            'X-CSRF-TOKEN': 'v8m81wQPi6xtIHcc936TT84RYsADOBfhKCsacCzF',
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.status_code === 200) {
            
            
            
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Avatar Deleted Successfully!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3a64d1',
                allowOutsideClick: false,
                allowEscapeKey: false,
                 
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                   location.reload();
                }
            });
            
            
        } else {
           
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error Fetching API',
                showConfirmButton: true,
                allowOutsideClick: false,
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete Avatar',
        });
    });
}



function updateProfileController(url) {
    // Prevent default form submission
    event.preventDefault();

    Swal.fire({
        title: 'Updating...',
        imageUrl: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
        imageAlt: 'Loader',
        showConfirmButton: false,
        allowOutsideClick: false,
        imageWidth: 40,
        imageHeight: 40,
         
    });

    // Serialize form data
    const formData = new FormData(document.querySelector('#formProfile'));

    fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': 'v8m81wQPi6xtIHcc936TT84RYsADOBfhKCsacCzF',
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    
    

    .then(data => {
         const message = data.message || 'Error processing API.';
        const amountText = message ? `${message}` : '';

        if (data.status_code === 200) {
            Swal.fire({
                text: 'Profile Updated Successfully!',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3a64d1',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                 
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                                        
                    }
                      });
                                
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: message,
                                    confirmButtonText: 'OK',
                                    confirmButtonColor: '#3a64d1',
                                    allowOutsideClick: true,
                                    allowEscapeKey: true,
                                     
                                }).then((result) => {
                                    if (result.isConfirmed || result.isDismissed) {
                                        // Handle error confirmation result
                                    }
                                });
                            }
                        })
                        .catch(error => {
                            // Handle fetch error
                            console.error('Error:', error);
                    
                         
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'An unexpected error occurred. Please try again.',
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#3a64d1',
                                allowOutsideClick: true,
                                allowEscapeKey: true,
                                 
                            }).then((result) => {
                                // Handle error confirmation result
                                if (result.isConfirmed || result.isDismissed) {
                                   
                                }
                            });
                        });
                    }

//Password Change Modal

function updatePasswordController(url) {
    // Prevent default form submission
    event.preventDefault();

    Swal.fire({
        title: 'Loading...',
        imageUrl: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
        imageAlt: 'Loader',
        showConfirmButton: false,
        allowOutsideClick: false,
        imageWidth: 40,
        imageHeight: 40,
         
    });

    // Serialize form data
    const formData = new FormData(document.querySelector('#formPassword'));

    fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': 'v8m81wQPi6xtIHcc936TT84RYsADOBfhKCsacCzF',
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    

    .then(data => {
         const message = data.message || 'Error processing API.';
        const amountText = message ? `${message}` : '';

        if (data.status_code === 200) {
            Swal.fire({
                text: 'Password Updated Successfully!',
                confirmButtonColor: '#3a64d1',
                confirmButtonText: 'Ok',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                 
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                                        
                    }
                      });
                                
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: message,
                                    confirmButtonText: 'OK',
                                    confirmButtonColor: '#3a64d1',
                                    allowOutsideClick: true,
                                    allowEscapeKey: true,
                                     
                                }).then((result) => {
                                    if (result.isConfirmed || result.isDismissed) {
                                        // Handle error confirmation result
                                    }
                                });
                            }
                        })
                        .catch(error => {
                            // Handle fetch error
                            console.error('Error:', error);
                    
                         
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'An unexpected error occurred. Please try again.',
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#3a64d1',
                                allowOutsideClick: true,
                                allowEscapeKey: true,
                                 
                            }).then((result) => {
                                // Handle error confirmation result
                                if (result.isConfirmed || result.isDismissed) {
                                   
                                }
                            });
                        });
                    }
    
</script>
