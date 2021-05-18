package com.timeSNS.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "NOTEMEMORY")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notememory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "NMIDX")
	private Long nmidx;
	
	@Column(name = "TLCIDX")
	private int tlcidx;
	
	@Column(name = "MIDX")
	private int midx;
	
	@Column(name = "NMCONTENT")
	private String nmcontent;
	
	@Column(name = "NMREGDATE")
	private LocalDateTime nmregdate;
	
}
