package com.preproject.server.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class QuestionPostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private String  email;

    public void addEmail(String email) {
        this.email = email;
    }
}
