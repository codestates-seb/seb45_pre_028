package com.preproject.server.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class QuestionPageDto {

    List<QuestionResponseDto> questionData; // 답변 데이터
    private PageInfo pageInfo;  // 페이지 정보
}
