package com.timeSNS.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
	private Long midx;
	
	@Column(name = "MID")
	private String username;
	
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
	private LocalDate mbirthday;
	
	@Column(name = "MSECESSIONYN")
	private String msecessionyn;
	
	@JsonIgnore
	@Column(name = "ACTIVATED")
	private boolean activated;
	
	@ManyToMany
	@JoinTable(
			name = "user_authority",
			joinColumns = {@JoinColumn(name = "MIDX", referencedColumnName = "MIDX")},
			inverseJoinColumns = {@JoinColumn(name = "AUTHORITYNAME", referencedColumnName = "AUTHORITYNAME")}
	)
	private Set<Authority> authorities;
	
}
