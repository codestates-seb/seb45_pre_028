package com.preproject.server.question.service;


import com.preproject.server.question.exception.BusinessLogicException;
import com.preproject.server.question.exception.ExceptionCode;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question){
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        Question updatedQuestion = findQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> updatedQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> updatedQuestion.setContent(content));

        return questionRepository.save(updatedQuestion);
    }

    @Transactional(readOnly = true)
    public Question findQuestion(Long question_id) {
        return questionRepository.findById(question_id)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }


    // 답변 조회(페이지네이션 구현)
    public Page<Question> findAnswers(int page, int size) { // page, size를 매개변수로 멤버를 조회

        // page, size를 기반으로 PageRequest 객체를 내림차순으로 생성해서 페이지네이션 적용
        // PageRequest 페이지 번호와 페이지 크기를 나타내는 정보 값을 가짐 + 오름차순 정렬
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("questionId").ascending());

        // pageRequest를 이용해 등록된 답변 조회
        Page<Question> questionPage = questionRepository.findAll(pageRequest);

        return questionPage;
    }

    public void deleteQuestion(long question_id){
        Question foundQuestion = findQuestion(question_id);
        questionRepository.delete(foundQuestion);
    }
}