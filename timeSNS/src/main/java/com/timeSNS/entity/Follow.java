package com.timeSNS.entity;

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
@Table(name = "FOLLOW")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Follow {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FLIDX")
	private int flidx;
	
	@Column(name = "TLIDX")
	private int tlidx;
	
	@Column(name = "FLWRMIDX")
	private int flwrmidx;
	
	@Column(name = "FLWMIDX")
	private int flwmidx;
	
}
