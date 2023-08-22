package com.preproject.server.answer.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;


import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
public class AnswerPostDto { // 답변 등록 시 필요한 데이터

    // 답변할 질문
    private Long questionId;


    // 답변할 사용자
    private Long memberId;

    private String email;


    // 답변 내용 ( 최소 글자수 제한 )
    @NotBlank(message = "답변 내용을 입력하세요.")
    @Size(min = 2, max = 200 , message = " 답변 내용은 2글자 이상 입력하세요.")
    private String content;


    public void addEmail(String email) {
        this.email = email;
    }
}
