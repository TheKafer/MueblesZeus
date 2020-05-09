class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
 
    }
    pick(normalizedPosition, scene, camera, time) {
      if (this.pickedObject) {
        this.pickedObject.scale.set(1,1,1)
        this.pickedObject = undefined;
      }
      
      this.raycaster.setFromCamera(normalizedPosition, camera);
 
      var intersects = this.raycaster.intersectObjects(objects, true); 
      if (intersects.length > 0) {
        this.pickedObject = intersects[0].object;
        this.pickedObject.scale.set(2,2,2);
    
      }
    }
  }
