package com.timeSNS.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "MEMBER")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MIDX")
	private int midx;
	
	@Column(name = "MID")
	private String mid;
	
	@JsonIgnore
	@Column(name = "MPWD")
	private String mpwd;
	
	@Column(name = "MREGDATE")
	private LocalDateTime mregdate;
	
	@Column(name = "MPHOTO")
	private String mphoto;
	
	@Column(name = "MNICKNAME")
	private String mnickname;
	
	@Column(name = "MPRODUCE")
	private String mproduce;
	
	@Column(name = "MBIRTHDAY")
	private LocalDateTime mbirthday;
	
	@Column(name = "MSECESSIONYN")
	private String msecessionyn;
	
}
