function DataTabs(tabs,tabItems,currentItem,cTabClassName,cTabItemClassName){
	this.currentTabClassName = (cTabClassName!=null && cTabClassName!="")?cTabClassName:"current-tab";
	this.currentTabItemClassName = (cTabItemClassName != null && cTabItemClassName != "")?cTabItemClassName:"current-tab-item";
	this.tabs = tabs;
	this.tabItems = tabItems;
	this.currentItem = currentItem?currentItem:0;
	this.refreshable = false;
	self = this;

	this.tabItems.forEach(function(value,index,array){
		array[index].onclick = function(){
			self.switchTo(index);
		}
		array[index].ontap = function(){
			self.switchTo(index);
		}
	});

	this.tabs.forEach(function(value,index,array){
		var isTouchMove, startTx, startTy;

		array[index].addEventListener('touchstart',function(e){
			var touches = e.touches[0];

			startTx = touches.clientX;
			startTy = touches.clientY;
			isTouchMove = false;
		},false);

		array[index].addEventListener('touchmove',function(e){
			isTouchMove = true;
			e.preventDefault();
		},false);

		array[index].addEventListener('touchend',function(e){
			if(!isTouchMove){
				return;
			}

			var touches = e.changedTouches[0],
		    endTx = touches.clientX,
		    endTy = touches.clientY,
		    distanceX = startTx - endTx
		    distanceY = startTy - endTy,
		    isSwipe = false;
			if( Math.abs(distanceX) >= Math.abs(distanceY) ){
				if( distanceX > self.swipeDeltaForHorizontal ){
				  	self.swipeRight();
				  	isSwipe = true;
				}
				else if( distanceX < -self.swipeDeltaForHorizontal ){
					self.swipeLeft();
				  	isSwipe = true;
				}
			}
			else{
				if( distanceY < -self.swipeDeltaForVertical ){
				  self.swipeUp();      
				  isSwipe = true;
				}
				else if( distanceY > self.swipeDeltaForVertical ){
				  self.swipeDown();
				  isSwipe = true;
				}
			}

			if( isSwipe ){
			// console.log( 'fire swipe event' );
			}

		},false);
	});
}

DataTabs.prototype.swipeDeltaForHorizontal = 20;

DataTabs.prototype.swipeDeltaForVertical = 20;

DataTabs.prototype.swipeUp = function(){

}

DataTabs.prototype.swipeDown = function(){

}

DataTabs.prototype.swipeLeft = function(){
	self.switchTo(self.currentItem-1);
}

DataTabs.prototype.swipeRight = function(){
	self.switchTo(this.currentItem+1);
}

DataTabs.prototype.switchTo = function(index){
	if((!this.refreshable && index == this.currentItem)|| index<0 || index > this.tabs.length-1){
		return;
	}

	self.actionBeforeSwitch();
	
	removeClass(this.tabs[this.currentItem],this.currentTabClassName);
	removeClass(this.tabItems[this.currentItem],this.currentTabItemClassName);

	this.currentItem = index;
	addClass(this.tabs[this.currentItem],this.currentTabClassName);
	addClass(this.tabItems[this.currentItem],this.currentTabItemClassName);

	self.actionAfterSwitch();
}

DataTabs.prototype.nextItem = function(){
	if(this.currentItem<this.tabs.length-1){
		this.currentItem++;
		return this.currentItem;
	}
}

DataTabs.prototype.lastItem = function(){
	if(this.currentItem>0){
		this.currentItem--;
		return this.currentItem;		
	}
}

DataTabs.prototype.actionBeforeSwitch = function(){

}

DataTabs.prototype.actionAfterSwitch = function(){

}