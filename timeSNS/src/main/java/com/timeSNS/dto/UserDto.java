package com.timeSNS.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

	@NotNull
	@Size(min = 3, max = 50)
	private String mid;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NotNull
	@Size(min = 3, max = 100)
	private String mpwd;
	
	@NotNull
	@Size(min = 3, max = 50)
	private String mnickname;
	
	private String mphoto;
	
	private LocalDate mbirthday;
	
	private String mproduce;
	
}
