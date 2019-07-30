angular.module("SMART2").directive("searchableCube", [function () {
        "use strict";
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                cubeletList: '=?',
                enableProceed: '&',
                selectedCube: '=?',
                formatKey: '@'
            },
            link: function (scope, $element, attrs) {
                scope.proceed = false;

                var enableProceed = scope.$eval(scope.enableProceed);

                //remove this after getting real time data
                
                scope.options = scope.cubeletList;
                scope.selectedCube = scope.selectedCube && {};

                var container,
                    camera, scene, renderer,
                    canvasMouseMove = false,
                    mouse = new THREE.Vector2(),
                    INTERSECTED, previousInt,
                    group = new THREE.Group(),

                    // mouseRotation vars
                    mouseDown = false,
                    mousemoved = false,
                    startPosition = { x: 0, y: 0, z: 0 },
                    rotateStartPoint = new THREE.Vector3(0, 0, 1),
                    rotateEndPoint = new THREE.Vector3(0, 0, 1),
                    curQuaternion,
                    animationComplete = true,
                    windowHalfX = window.innerWidth / 2,
                    windowHalfY = window.innerHeight / 2,
                    rotationSpeed = 2,
                    lastMoveTimestamp,
                    moveReleaseTimeDelta = 50,
                    selectedCublet,
                    startPoint = {
                        x: 0,
                        y: 0
                    },
                    deltaX = 0,
                    deltaY = 0;
                // mouseRotation vars End



                init();
                animate();

                function init() {
                    container = $element[0];

                    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
                    camera.position.set(-360, 440, 700);

                    scene = new THREE.Scene();
                    //scene.background = new THREE.Color(0x0067b0);

                    camera.lookAt(scene.position);

                    scene.add(new THREE.AmbientLight(0x505050));

                    var light = new THREE.SpotLight(0xffffff, 1.25);
                    light.position.set(-650, 650, 650);
                    // light.rotation.set(  37.32 * Math.PI/180,    -16.45* Math.PI/180,    204.184* Math.PI/180);
                    light.castShadow = true;

                    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 100, 10000));
                    light.shadow.bias = 0.00001;

                    light.shadow.mapSize.width = 4096;
                    light.shadow.mapSize.height = 4096;

                    scene.add(light);

                    var cubletWidth = 90,
                        cubeSeparation = 20,
                        geometry,
                        generateThreeByThree,
                        generateTwoByTwo;

                    var positionsArrayThreeByThree = [
                            [-1, 1, 1],
                            [-1, 0, 1],
                            [-1, -1, 1],
                            [0, 1, 1],
                            [0, 0, 1],
                            [0, -1, 1],
                            [1, 1, 1],
                            [1, 0, 1],
                            [1, -1, 1],
                            [1, 1, 0],
                            [1, 0, 0],
                            [1, -1, 0],
                            [1, 1, -1],
                            [1, 0, -1],
                            [1, -1, -1],
                            [0, 1, -1],
                            [0, 0, -1],
                            [0, -1, -1],
                            [-1, 1, -1],
                            [-1, 0, -1],
                            [-1, -1, -1],
                            [-1, 1, 0],
                            [-1, 0, 0],
                            [-1, -1, 0],
                            [0, 1, 0],
                            [0, -1, 0],
                            [0, 0, 0]
                        ],
                        positionsArrayTwoByTwo = [
                            [-1, 1, 1],
                            [-1, -1, 1],
                            [1, 1, 1],
                            [1, -1, 1],
                            [1, 1, -1],
                            [1, -1, -1],
                            [-1, 1, -1],
                            [-1, -1, -1]
                        ];


                    generateThreeByThree = function () {
                        geometry = new THREE.BoxGeometry(cubletWidth, cubletWidth, cubletWidth);
                        var object;
                        for (var i = 0; i < 27; i++) {
                            if (i < scope.options.length) {
                                object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: "#6fc2fb" }));
                            } else {
                                object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                                    color: 0xffffff,
                                    transparent: true,
                                    opacity: 0.7
                                }));
                            }
                            object.position.x = positionsArrayThreeByThree[i][0] * (cubletWidth + cubeSeparation);
                            object.position.y = positionsArrayThreeByThree[i][1] * (cubletWidth + cubeSeparation);
                            object.position.z = positionsArrayThreeByThree[i][2] * (cubletWidth + cubeSeparation);

                            object.scale.x = 1;
                            object.scale.y = 1;
                            object.scale.z = 1;

                            
                            object.dataID = i + 1;
                            if (i < scope.options.length) {
                                object.castShadow = true;
                                object.receiveShadow = true;
                                object.name = scope.options[i][scope.formatKey];
                                object.disable = false;
                            } else {
                                object.disable = true;
                            }

                            group.add(object);
                        }
                    };

                    generateTwoByTwo = function () {
                        geometry = new THREE.BoxGeometry(cubletWidth + 45, cubletWidth + 45, cubletWidth + 45);
                        var object;
                        for (var i = 0; i < 8; i++) {
                            if (i < scope.options.length) {
                                object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: "#6fc2fb" }));
                            } else {
                                object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                                    color: 0xffffff,
                                    transparent: true,
                                    opacity: 0.7
                                }));
                            }

                            object.position.x = positionsArrayTwoByTwo[i][0] * (cubletWidth + cubeSeparation + 45) / 2;
                            object.position.y = positionsArrayTwoByTwo[i][1] * (cubletWidth + cubeSeparation + 45) / 2;
                            object.position.z = positionsArrayTwoByTwo[i][2] * (cubletWidth + cubeSeparation + 45) / 2;

                            object.scale.x = 1;
                            object.scale.y = 1;
                            object.scale.z = 1;
                            object.dataID = i + 1;
                            
                            if (i < scope.options.length) {
                                object.name = scope.options[i][scope.formatKey];
                                object.castShadow = true;
                                object.receiveShadow = true;
                                object.disable = false;
                            } else {
                                object.disable = true;
                            }

                            group.add(object);
                        }
                    };
                    

                    if (scope.options.length > 8) {
                        generateThreeByThree();
                    } else {
                        generateTwoByTwo();
                    }

                    scene.add(group);

                    renderer = new THREE.WebGLRenderer({
                            alpha: true,
                            antialias: true
                    });
                    renderer.setPixelRatio(window.devicePixelRatio);
                    renderer.setSize(window.innerWidth, window.innerHeight);

                    renderer.shadowMap.enabled = true;
                    renderer.shadowMap.type = THREE.PCFShadowMap;
                    renderer.shadowMap.soft = true;

                    container.appendChild(renderer.domElement);
                    container.addEventListener('mousemove', onMouseMove);

                    // window.addEventListener('resize', onWindowResize, false);
                    container.addEventListener('mousedown', onDocumentMouseDown, true);
                    window.addEventListener('resize', onWindowResize, false);
                }

                // keyhandler
                container.addEventListener('keydown', keyPressed);

                function keyPressed(e) {
                    switch (e.keyCode) {
                        case 38:
                            scope.handleRotation("top");
                            break;
                        case 40:
                            scope.handleRotation("bottom");
                            break;
                        case 37:
                            scope.handleRotation("left");
                            break;
                        case 39:
                            scope.handleRotation("right");
                            break;
                    }
                };
                

                //$element.find(".searchElement").on('click', function (event) {
                //    event.stopPropagation();
                //});
                   
                
                //$element.find(".navBtn").on('click', function(event) {
                //    scope.handleRotation(this.id);
                //});

                scope.handleRotation = function(btnType) {
                    if (!animationComplete) {
                        return;
                    }
                    switch (btnType) {
                        case "top":
                            animateRotation(1, 0, 0);
                            break;
                        case "bottom":
                            animateRotation(-1, 0, 0);
                            break;
                        case "left":
                            animateRotation(0, 1, 0);
                            break;
                        case "right":
                            animateRotation(0, -1, 0);
                            break;
                    }
                };

                scope.routeToReport = function () {
                    location.href = "index_reports.html#/analytics/new";
                }

                scope.searchElementByValue = function () {
                    var value = $element.find(".searchElement input").val();
                    var index = _.findIndex(this.options, { name: value.charAt(0).toUpperCase() + value.slice(1) });
                    if(index !== -1)
                    this.selected = this.options[index];
                }
                

                function animateRotation(xDirection, yDirection, zDirection) {
                    var position = { x: 0, y: 0 },
                        target = { x: 0, y: Math.PI / 2 },
                        tween = new TWEEN.Tween(position).to(target, 1000),
                        prePositon = { x: 0, y: 0 },
                        X = 0,
                        Y = 0,
                        Z = 0;

                    tween.easing(TWEEN.Easing.Quadratic.InOut);

                    tween.onUpdate(function() {
                        if (xDirection) {
                            X = position.y - prePositon.y;
                            if (xDirection == 1) {
                                X = -1 * X;
                            }
                        } else {
                            Y = position.y - prePositon.y;
                            if (yDirection == 1) {
                                Y = -1 * Y;
                            }
                        }

                        animationComplete = false;
                        var deltaRotationQuaternion = new THREE.Quaternion()
                            .setFromEuler(new THREE.Euler(X,
                                Y,
                                Z,
                                'XYZ'
                            ));
                        group.quaternion.multiplyQuaternions(deltaRotationQuaternion, group.quaternion);
                        prePositon.y = position.y;
                    });
                    tween.start();
                    tween.onComplete(function() {
                        animationComplete = true;
                    });
                };

                // keyhandler end


                function onWindowResize() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                };

                function animate() {
                    requestAnimationFrame(animate);
                    render();
                    update();
                    TWEEN.update();
                };

                // animationLogic
                function onDocumentMouseDown(event) {
                    if (!animationComplete || event.target != $element.find('.mainScreen')[0]) {
                        return;
                    }
                    //event.preventDefault();
                    container.addEventListener('mousemove', onDocumentMouseMove, false);
                    container.addEventListener('mouseup', onDocumentMouseUp, false);

                    mouseDown = true;

                    startPoint = {
                        x: event.clientX,
                        y: event.clientY
                    };

                    rotateStartPoint = rotateEndPoint = projectOnTrackball(0, 0);
                };

                function onMouseMove(e) {
                    canvasMouseMove = true;
                    event.preventDefault();
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                    mouse.clientX = event.clientX;
                    mouse.clientY = event.clientY;
                };

                function onDocumentMouseMove(event) {
                    mousemoved = true;

                    deltaX = event.x - startPoint.x;
                    deltaY = event.y - startPoint.y;

                    handleRotationMouse();

                    startPoint.x = event.x;
                    startPoint.y = event.y;

                    lastMoveTimestamp = new Date();
                };

                function onDocumentMouseUp(event) {
                    highlightCublet(previousInt);
                    if (new Date().getTime() - (lastMoveTimestamp ? lastMoveTimestamp.getTime() : 0) > moveReleaseTimeDelta) {
                        deltaX = event.x - startPoint.x;
                        deltaY = event.y - startPoint.y;
                    }

                    mouseDown = false;

                    container.removeEventListener('mousemove', onDocumentMouseMove, false);
                    container.removeEventListener('mouseup', onDocumentMouseUp, false);
                    if (mousemoved && animationComplete) {
                        // resetCube();
                    }
                    mousemoved = false;


                    var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
                    vector.unproject(camera);
                    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

                    // create an array containing all objects in the scene with which the ray intersects
                    var intersects = ray.intersectObjects(scene.children[2].children);

                    // if there is one (or more) intersections
                    if (intersects.length > 0 && (selectedCublet == void 0 || intersects[0].object.name != selectedCublet.name)) {
                        popInCube(INTERSECTED);
                        popOutCube(INTERSECTED);
                        //console.log("route to: " + intersects[0].object.name);
                        
                    }
                };


                function projectOnTrackball(touchX, touchY) {
                    var mouseOnBall = new THREE.Vector3();

                    mouseOnBall.set(
                        clamp(touchX / windowHalfX, -1, 1), clamp(-touchY / windowHalfY, -1, 1),
                        0.0
                    );

                    var length = mouseOnBall.length();

                    if (length > 1.0) {
                        mouseOnBall.normalize();
                    } else {
                        mouseOnBall.z = Math.sqrt(1.0 - length * length);
                    }

                    return mouseOnBall;
                };

                function rotateMatrix(rotateStart, rotateEnd) {
                    var axis = new THREE.Vector3(),
                        quaternion = new THREE.Quaternion(),
                        angle;

                    angle = Math.acos(rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length());

                    if (angle) {
                        axis.crossVectors(rotateStart, rotateEnd).normalize();
                        angle *= rotationSpeed;
                        quaternion.setFromAxisAngle(axis, angle);
                    }
                    return quaternion;
                };

                function clamp(value, min, max) {
                    return Math.min(Math.max(value, min), max);
                };
                // animationLogicEnds


                function render() {
                    TWEEN.update();
                    if (!mouseDown) {
                        var drag = 0.95,
                            minDelta = 0.05;

                        if (deltaX < -minDelta || deltaX > minDelta) {
                            deltaX *= drag;
                        } else {
                            deltaX = 0;
                        }

                        if (deltaY < -minDelta || deltaY > minDelta) {
                            deltaY *= drag;
                        } else {
                            deltaY = 0;
                        }

                        // handleRotationMouse();
                    }
                    renderer.render(scene, camera);
                };


                var handleRotationMouse = function() {
                    rotateEndPoint = projectOnTrackball(deltaX, deltaY, -1 * deltaX);
                    var rotateQuaternion = rotateMatrix(rotateStartPoint, rotateEndPoint);
                    curQuaternion = group.quaternion;
                    curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion);
                    curQuaternion.normalize();
                    group.setRotationFromQuaternion(curQuaternion);
                    rotateEndPoint = rotateStartPoint;
                };

                function resetCube() {
                    var position = group.rotation;
                    animateResetRotation(Math.sign(position.x), Math.sign(position.y), Math.sign(position.z), group.rotation.x, group.rotation.y, group.rotation.z);
                    group.updateMatrix();
                };

                function animateResetRotation(xDirection, yDirection, zDirection, anglex, angley, anglez) {
                    var PI = Math.PI,
                        position = { x: anglex, y: angley, z: anglez },
                        nearesrXGap = Math.abs(anglex % (PI / 2)) > PI / 4 ? anglex + xDirection * (PI / 2 - Math.abs(anglex % (PI / 2))) : anglex - anglex % (PI / 2),
                        nearesrYGap = Math.abs(angley % (PI / 2)) > PI / 4 ? angley + yDirection * (PI / 2 - Math.abs(angley % (PI / 2))) : angley - angley % (PI / 2),
                        nearesrZGap = Math.abs(anglez % (PI / 2)) > PI / 4 ? anglez + zDirection * (PI / 2 - Math.abs(anglez % (PI / 2))) : anglez - anglez % (PI / 2),
                        target = { x: nearesrXGap, y: nearesrYGap, z: nearesrZGap },
                        tween = new TWEEN.Tween(position).to(target, 200),
                        prePositon = { x: anglex, y: anglex, z: anglez },
                        X, Y, Z;

                    // tween.easing(TWEEN.Easing.Linear.InOut);

                    tween.onUpdate(function() {
                        if (xDirection) {
                            X = position.x - prePositon.x;
                            if (xDirection == 1) {
                                X = -1 * X;
                            }
                        }
                        if (yDirection) {
                            Y = position.y - prePositon.y;
                            if (yDirection == 1) {
                                Y = -1 * Y;
                            }
                        }
                        if (zDirection) {
                            Z = position.z - prePositon.z;
                            if (yDirection == 1) {
                                Y = -1 * Y;
                            }
                        }

                        animationComplete = false;
                        group.rotation.x = position.x;
                        group.rotation.y = position.y;
                        group.rotation.z = position.z;
                        prePositon.x = position.x;
                        prePositon.y = position.y;
                        prePositon.z = position.z;
                    });
                    tween.start();
                    tween.onComplete(function() {
                        animationComplete = true;
                    });
                };

                //$element.find("#search-cublet").on("click", function (e) {
                //     searchElement();
                //});

                scope.searchElement = function (requestedID) {
                    if (scope.options.length > 8) {
                        switch (requestedID) {
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                                animateFindElementRotation(0, 0, 0, 0, 0, 0, requestedID);
                                break;
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                                animateFindElementRotation(1, 0, 1, Math.PI, 0, Math.PI, requestedID);
                                break;
                            case 22:
                            case 23:
                            case 24:
                                animateFindElementRotation(0, 1, 0, 0, Math.PI / 2, 0, requestedID);
                                break;
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                                animateFindElementRotation(0, -1, 0, 0, -Math.PI / 2, 0, requestedID);
                                break;
                            case 25:
                                animateFindElementRotation(1, 0, 0, Math.PI / 2, 0, 0, requestedID);
                                break;
                            case 26:
                                animateFindElementRotation(-1, 0, 0, -Math.PI / 2, 0, 0, requestedID);
                                break;
                        }
                    } else {
                        switch (requestedID) {
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                animateFindElementRotation(0, 0, 0, 0, 0, 0, requestedID);
                                break;
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                                animateFindElementRotation(1, 0, 1, Math.PI, 0, Math.PI, requestedID);
                                break;
                        }
                    }
                    
                };

                function animateFindElementRotation(xDirection, yDirection, zDirection, anglex, angley, anglez, requestedID) {
                    var INTERSECTED = scene.children[2].children[parseInt(requestedID) - 1],
                        currentAngles = group.rotation,
                        PI = Math.PI,
                        position = { x: currentAngles.x, y: currentAngles.y, z: currentAngles.z },
                        target = { x: anglex, y: angley, z: anglez },
                        tween = new TWEEN.Tween(position).to(target, 200),
                        prePositon = { x: anglex, y: anglex, z: anglez },
                        X, Y, Z;

                    highlightCublet(previousInt);
                    if (previousInt == void 0 || previousInt.dataID !== requestedID) {
                        animateCubePopup(INTERSECTED);
                        popInCube(INTERSECTED);
                        popOutCube(INTERSECTED);
                    }

                    previousInt = INTERSECTED;

                    // tween.easing(TWEEN.Easing.Linear.InOut);

                    tween.onUpdate(function() {
                        if (xDirection) {
                            X = position.x - prePositon.x;
                            if (xDirection == 1) {
                                X = -1 * X;
                            }
                        }
                        if (yDirection) {
                            Y = position.y - prePositon.y;
                            if (yDirection == 1) {
                                Y = -1 * Y;
                            }
                        }
                        if (zDirection) {
                            Z = position.z - prePositon.z;
                            if (yDirection == 1) {
                                Y = -1 * Y;
                            }
                        }

                        animationComplete = false;
                        group.rotation.x = position.x;
                        group.rotation.y = position.y;
                        group.rotation.z = position.z;
                        prePositon.x = position.x;
                        prePositon.y = position.y;
                        prePositon.z = position.z;
                    });
                    tween.start();
                    tween.onComplete(function() {
                        animationComplete = true;
                    });
                };

                // highlight logic
                function update() {
                    if (!animationComplete || mouseDown || !canvasMouseMove) {
                        return;
                    }
                    // find intersections

                    // create a Ray with origin at the mouse position
                    //   and direction into the scene (camera direction)
                    var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
                    vector.unproject(camera);
                    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

                    // create an array containing all objects in the scene with which the ray intersects
                    var intersects = ray.intersectObjects(scene.children[2].children);

                    // INTERSECTED = the object in the scene currently closest to the camera 
                    //      and intersected by the Ray projected from the mouse position    

                    // if there is one (or more) intersections
                    if (intersects.length > 0) {
                        // if the closest object intersected is not the currently stored intersection object
                        if (intersects[0].object != INTERSECTED) {

                            // restore previous intersection object (if it exists) to its original color
                            if (INTERSECTED && (selectedCublet == void 0 || INTERSECTED.id != selectedCublet.id) && !INTERSECTED.disable) {
                                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                            }


                            // store reference to closest object as current intersection object
                            INTERSECTED = intersects[0].object;
                            if (INTERSECTED.disable) {
                                return;
                            }

                            if (previousInt !== void 0 && INTERSECTED.name !== previousInt.name && previousInt.hovered) {
                                highlightCublet(previousInt);
                            }

                            if (previousInt == void 0 || INTERSECTED.name !== previousInt.name) {
                                // store color of closest object (for later restoration)
                                canvasMouseMove = false;

                                animateCubePopup(INTERSECTED);
                            }
                        }
                    } else // there are no intersections
                    {
                        INTERSECTED = null;
                    }
                };

                var getIntersect = function (INTERSECTED, camera, jqdiv) {
                    var pos = INTERSECTED.position.clone(),
                    projScreenMat = new THREE.Matrix4();
                    projScreenMat.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
                    projScreenMat.multiplyVector3(pos);

                    return {
                        "x": (pos.x + 1) * jqdiv.width() / 2 + jqdiv.offset().left,
                        "y": (-pos.y + 1) * jqdiv.height() / 2 + jqdiv.offset().top
                    };
                };


                function animateCubePopup(INTERSECTED) {
                    var position = { x: 0, y: 0 },
                        target = { x: 0, y: 20 },
                        tween = new TWEEN.Tween(position).to(target, 100),
                        prePositon = { x: 0, y: 0 },
                        $mainScreen = $element.find(".mainScreen"),
                        intersect = {
                            x : mouse.clientX,
                            y : mouse.clientY
                        };

                    if (mouse.clientY > 100) {
                        intersect = getIntersect(INTERSECTED, camera, $element);
                    }

                    $mainScreen.attr("interesect", JSON.stringify(intersect))
                    .attr("tooltipActive", true)
                    .attr("message", "Cublet <b>" + INTERSECTED.name + "</b>")
                    .trigger("interesected");

                    INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                    INTERSECTED.hovered = true;
                    // set a new color for closest object
                    if (!INTERSECTED.selected) {
                        INTERSECTED.material.color.setHex(0xa49cfb);
                    } else {
                        INTERSECTED.material.color.setHex(0xffa600);
                    }
                    previousInt = INTERSECTED;
                };

                function highlightCublet(cublet) {
                    $element.find(".mainScreen").attr("tooltipActive", false);
                    if (cublet !== void 0 && cublet.hovered) {
                        if (selectedCublet == void 0 || previousInt.id != selectedCublet.id) {
                            previousInt.material.color.setHex(previousInt.currentHex);
                            previousInt.hovered = false;
                        }
                    }
                }

                function popOutCube(cublet) {
                    if (cublet.disable) {
                        return;
                    }
                    animationComplete = false;
                    previousInt.material.color.setHex(0xffa600);
                    cublet.selected = true;

                    scope.selectedCublet = _.where(scope.cubeletList, { id: cublet.dataID })[0];

                    var position = { x: 0, y: 0 },
                        target = { x: 0, y: 20 },
                        tween = new TWEEN.Tween(position).to(target, 100),
                        prePositon = { x: 0, y: 0 };
                    
                    tween.easing(TWEEN.Easing.Quadratic.InOut);

                    tween.onUpdate(function() {
                        cublet.position.x += Math.sign(cublet.position.x) * (position.y - prePositon.y);
                        cublet.position.y += Math.sign(cublet.position.y) * (position.y - prePositon.y);
                        cublet.position.z += Math.sign(cublet.position.z) * (position.y - prePositon.y);
                        selectedCublet = cublet;
                        prePositon.y = position.y;
                    });
                    tween.start();
                    tween.onComplete(function() {
                        animationComplete = true;
                        if(!scope.proceed) {
                            scope.proceed = true;
                            enableProceed();
                            scope.$digest();
                        }
                    });
                }

                function popInCube(currentSelection) {
                    if (selectedCublet == void 0 || currentSelection.disable) {
                        return;
                    }
                    selectedCublet.selected = false;
                    selectedCublet.material.color.setHex(7324411);
                    selectedCublet.position.x -= Math.sign(selectedCublet.position.x) * 20;
                    selectedCublet.position.y -= Math.sign(selectedCublet.position.y) * 20;
                    selectedCublet.position.z -= Math.sign(selectedCublet.position.z) * 20;
                }

                scope.searchElement(scope.selectedCube.id);
            },
            templateUrl: 'shared/directives/3DSearchableCube/3DSearchableCubeTemplate.html'
        };

    }]);