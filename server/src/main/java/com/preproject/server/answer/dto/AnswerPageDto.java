package com.preproject.server.answer.dto;

import com.preproject.server.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class AnswerPageDto {

    List<AnswerResponseDto> answerData; // 답변 데이터
    private PageInfo pageInfo;  // 페이지 정보
}
