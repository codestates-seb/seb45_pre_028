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
    @Email
    private String email;

    @NotBlank(message = "이름은 공백이 아니어야 합니다.")
    @Size(min = 2,max = 12,message = "이름은 2자 이상 12자 이하여야 합니다.")
    private String name;

    @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,12}$",
    message = "비밀번호는 8자리 이상 12자리 이하 영문자와 숫자 특수문자를 포함하여야 합니다.")
    private String password;
}
