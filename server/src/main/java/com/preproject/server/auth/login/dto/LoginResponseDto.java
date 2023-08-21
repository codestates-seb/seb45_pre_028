package com.preproject.server.auth.login.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private long memberId;
    private String accessToken;

    public LoginResponseDto(long memberId, String accessToken) {
        this.memberId = memberId;
        this.accessToken = accessToken;
    }
}
