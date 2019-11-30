
function submit(name) {
    const server = $('#server').val();
    const token = $('#token').val();

    if (!token) {
        handleErrorState({}, null, 'Token is a required field.');
        return;
    }
    console.log({server, token});

    $.ajax({
        url: `/${name}`,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({server, token})
    }).done(handleSuccessState.bind(null, name))
      .fail(handleErrorState);
}

function handleSuccessState(name) {
    $('#alert').html(
    `<div class="alert alert-success" role="alert">
        Credentials sent to watch
    </div>`);
}

function handleErrorState(res, type, errorMsg) {
    $('#alert').html(
        `<div class="alert alert-danger" role="alert">
            ${res.responseText || errorMsg}
        </div>`);
}