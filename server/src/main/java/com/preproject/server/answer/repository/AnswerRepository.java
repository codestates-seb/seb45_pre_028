package com.preproject.server.answer.repository;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.mapper.QuestionMapperImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository <Answer, Long> {
    Page<Answer> findByQuestion(Question question, PageRequest pageRequest);

//    @Query("select 'questionId' from Question left join Answer On Question.questionId = Answer.question.questionId")
//    Optional<Question> findByQuestionAndAnswerId(Question question, Answer answer);
}
