package com.preproject.server.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String email;
    private String name;
    private String password;
}
