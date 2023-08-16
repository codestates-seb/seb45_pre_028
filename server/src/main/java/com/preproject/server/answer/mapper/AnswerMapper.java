package com.preproject.server.answer.mapper;

import com.preproject.server.answer.dto.AnswerPatchDto;
import com.preproject.server.answer.dto.AnswerPostDto;
import com.preproject.server.answer.dto.AnswerResponseDto;
import com.preproject.server.answer.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {


    Answer answerPostDtoToanswer(AnswerPostDto answerPostDto);

    Answer answerPatchDtoToanswer(AnswerPatchDto answerPatchDto);

    AnswerResponseDto answerToAnswerResponseDto(Answer answer);

    // 리스트로 응답할 dto -> 페이지네이션에 사용하기 위함
    List<AnswerResponseDto> answerToAnswerResponseDtos(List<Answer> answers);

}
