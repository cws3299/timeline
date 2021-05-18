package com.timeSNS.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/post")
public class PostController {

	public String postList() {
		return "postList";
	}
	
	public String postListAdd() {
		return "postListAdd";
	}
	
	public String writePostPage() {
		return "writePostPage";
	}
	
	public String writePost() {
		return "writePost";
	}
	
	public String modifyPostPage() {
		return "modifyPostPage";
	}
	
	public String modifyPost() {
		return "modifyPost";
	}
	
	public String detail() {
		return "detail";
	}
	
	public String emotion() {
		return "emotion";
	}
	
	public String review() {
		return "review";
	}
	
	public String reviewList() {
		return "reviewList";
	}
	
	public String note() {
		return "note";
	}
	
	public String noteList() {
		return "noteList";
	}
	
	public String noteListAdd() {
		return "noteListAdd";
	}
	
	public String noteDetail() {
		return "noteDetail";
	}
	
	public String modifyNotePage() {
		return "modifyNotePage";
	}
	
	public String modifyNote() {
		return "modifyNote";
	}
	
}
