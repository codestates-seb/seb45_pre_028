package com.preproject.server.question.mapper;

import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.dto.QuestionPostDto;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
//    QuestionResponseDto questionToQuestionResponseDto(Question question);

    default QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if (question == null) {
            return null;
        } else {
            Long questionId = null;
            String title = null;
            String content = null;
            LocalDateTime createdAt = null;
            LocalDateTime modifiedAt = null;
            questionId = question.getQuestionId();
            title = question.getTitle();
            content = question.getContent();
            createdAt = question.getCreatedAt();
            modifiedAt = question.getModifiedAt();
            String username = question.getMember().getName();
            QuestionResponseDto questionResponseDto = new QuestionResponseDto(questionId, username, title, content, createdAt, modifiedAt);
            return questionResponseDto;
        }
    }

    List<QuestionResponseDto> questionToQuestionResponseDtos(List<Question> questions);
}