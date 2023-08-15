package com.preproject.server.question.mapper;

import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.dto.QuestionPostDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
    QuestionResponseDto questionToQuestionResponseDto(Question question);

    List<QuestionResponseDto> questionToQuestionResponseDtos(List<Question> questions);
}
