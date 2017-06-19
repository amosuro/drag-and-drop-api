class DragAndDrop {
    constructor() {
        this.draggableSource      = [].slice.call(document.querySelectorAll('[draggable]'));
        this.draggableTarget      = [].slice.call(document.querySelectorAll('[data-draggable-target]'));
        this.currentDragSource    = null;
        
        this.addListeners();
    }
    
    addListeners() {
        this.draggableSource.forEach((element) => {
            element.addEventListener('dragstart', () => this.dragStartHandler(event), false);
            element.addEventListener('dragend', () => this.dragEndHandler(event), false);
        });
        
        this.draggableTarget.forEach((element) => {
            element.addEventListener('dragstart', () => this.dragStartHandler(event), false);
            element.addEventListener('dragover', () => this.dragOverHandler(event), false);
            element.addEventListener('dragenter', () => this.dragEnterHandler(event), false);
            element.addEventListener('dragleave', () => this.dragLeaveHandler(event), false);
            element.addEventListener('drop', () => this.dropHandler(event), false);
        });
    }
    
    dragStartHandler(e) {
        const element = e.target;
        
        this.currentDragSource = e;
        element.style.opacity = '0.3';
          
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
    }
    
    dragOverHandler(e) {
        e.preventDefault(); // Required to prevent default behaviour of dragging over an element
          
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    dragEnterHandler(e) {
        e.target.classList.add('table-row--targetted');
    }
    
    dragLeaveHandler(e) {
        e.target.classList.remove('table-row--targetted');
    }
    
    dropHandler(e) {
        if (this.currentDragSource !== e) {
            const data = e.dataTransfer.getData('text');
            const newRow = document.createElement('div');
            
            newRow.innerHTML = `${data}`;
            
            this.currentDragSource.innerHTML = e.target.innerHTML;
            e.target.appendChild(newRow);
        }
  
        return false;
    }
    
    dragEndHandler(e) {
        e.target.style.opacity = '1';
        e.target.classList.remove('table-row--targetted');
    }
}
