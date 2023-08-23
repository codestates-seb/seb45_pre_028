package com.preproject.server.answer.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerPatchDto {

    // 수정할 질문
    private Long answerId;

    // 답변 내용 ( 최소 글자수 제한 )
    @NotBlank
    @Size(min = 2, message = " 답변 내용은 2글자 이상 입력하세요.")
    private String content;


}

