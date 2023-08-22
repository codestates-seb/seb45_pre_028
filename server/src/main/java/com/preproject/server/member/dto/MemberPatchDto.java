package com.preproject.server.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class MemberPatchDto {
    private long memberId;

    @NotBlank(message = "이름은 공백이 아니어야 합니다.")
    @Size(min = 2, max = 12, message = "이름은 2자 이상 12자 이하여야 합니다.")
    private String name;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
            message = "비밀번호는 8자리 이상 영문자와 숫자를 포함하여야 합니다.")
    @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
    private String password;

    private String about;
}
