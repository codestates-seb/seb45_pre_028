package com.preproject.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @Getter 필드 값을 직접 받아올 수 있는 Getter 메서드를 생성
 * @Builder 빌더 메서드를 통해 객체를 생성하고 필드 값을 초기화
 * Getter로 필드 값을 가져오고 Builder를 통해 객체를 생성하고 필드 값을 수정
 *
 *
 * @Builder를 사용하니까 AnswerMapperImpI의 AnswerResponseDto에서 오류가 남.
 * 오류 내용
 * AnswerResponseDto cannot be applied to given types;
 * AnswerResponseDto answerResponseDto1 = new AnswerResponseDto();
 *                                                ^
 *   required: Long,String
 *   found: no arguments
 *   reason: actual and formal argument lists differ in length
 *
 * @Setter로 바꿔주니까 오류는 해결됨.
 */

@Getter
@Setter
@AllArgsConstructor
public class AnswerResponseDto {
    private Long answerId;
    private String content;
}
