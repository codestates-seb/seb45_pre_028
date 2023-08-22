package com.preproject.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@AllArgsConstructor
public class MemberPostDto {
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\\.[a-zA-Z]+$",
    message = "올바르지 않은 이메일 형식입니다.")
    private String email;

    @NotBlank(message = "이름은 공백이 아니어야 합니다.")
    @Size(min = 2,max = 12,message = "이름은 2자 이상 12자 이하여야 합니다.")
    private String name;

    @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
    message = "비밀번호는 8자리 이상 영문자와 숫자를 포함하여야 합니다.")
    private String password;

    private String about;
}
