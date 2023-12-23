AFRAME.registerComponent('crouch', {
    init: function () {
        var el = this.el;
        var cameraEl = document.querySelector('#camera');
        var isCrouching = false;
        var initialPosition = cameraEl.getAttribute('position');

        el.addEventListener('keydown', function (event) {
            if (event.key === 'Shift') {
                if (!isCrouching) {
                    cameraEl.setAttribute('position', {
                        x: initialPosition.x,
                        y: initialPosition.y - 0.5,
                        z: initialPosition.z
                    });
                    isCrouching = true;
                }
            }
        });

        el.addEventListener('keyup', function (event) {
            if (event.key === 'Shift') {
                if (isCrouching) {
                    cameraEl.setAttribute('position', initialPosition);
                    isCrouching = false;
                }
            }
        });
    }
});