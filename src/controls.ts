// From https://jasonwatmore.com/post/2023/01/04/vanilla-js-css-modal-popup-dialog-tutorial-with-example

function ge_openModal(id: string) {
    document.getElementById(id)?.classList.add('open');
    document.body.classList.add('modal-open');
}

// close currently open modal
function ge_closeModal() {
    document.querySelector('.modal.open')?.classList.remove('open');
    document.body.classList.remove('modal-open');
}


export function ge_setup() {
    (<any>window).ge_openModal = ge_openModal;
    (<any>window).ge_closeModal = ge_closeModal;

    window.addEventListener('load', function() {
        // close modals on background click
        document.addEventListener('click', event => {
            const target = event.target as Element;
            if (target.classList.contains('modal')) {
                ge_closeModal();
            }
        });
    });
}
