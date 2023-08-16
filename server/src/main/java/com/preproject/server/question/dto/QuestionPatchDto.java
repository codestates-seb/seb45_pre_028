package com.preproject.server.question.dto;


import com.preproject.server.question.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QuestionPatchDto {
    private Long questionId;

    @NotSpace(message = "제목은 공백이 아니어야 합니다")
    private String title;

    @NotSpace(message = "질문 내용은 공백이 아니어야 합니다")
    private String content;





}
