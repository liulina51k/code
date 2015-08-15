<?php
/*
 * 给观察者定义的规范
 */
interface Exception_Observer{
	public function update(Observer_Exception $e);
}