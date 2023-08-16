package com.preproject.server.answer.service;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.repository.AnswerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

//    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

//     답변 등록
    public Answer createAnswer(Answer answer) {

        // 회원을 조회하는 로직을 넣어야할지 아닐지?

//        // questionRepository에서 질문id 확인 후 질문 조회
//        Long questionId = questionRepository.getQuestionId(); -> 파라미터로 넣어야할듯
//        Question question = findQuestionById(questionId);
//
//        //질문에 답변 연결
//        answer.setQuestion(question);

        // 등록한 답변 저장
       return answerRepository.save(answer);
    }


    // 답변 수정
    public Answer updateAnswer(Answer answer) {


      Answer findanswer = findAnswerById(answer.getAnswerId());

//         답변 내용 업데이트
        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findanswer.setContent(content));


        return answerRepository.save(findanswer);
    }

    public Answer findAnswer(Long answerId) {
        return findAnswerById(answerId);
    }

    // 답변 조회(페이지네이션 구현)
    public Page<Answer> findAnswers(int page, int size) { // page, size를 매개변수로 멤버를 조회

        // page, size를 기반으로 PageRequest 객체를 내림차순으로 생성해서 페이지네이션 적용
        // PageRequest 페이지 번호와 페이지 크기를 나타내는 정보 값을 가짐 + 오름차순 정렬
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("answerId").ascending());

        // pageRequest를 이용해 등록된 답변 조회
        Page<Answer> answerPage = answerRepository.findAll(pageRequest);

        return answerPage;
    }

    public void deleteAnswer(Long answerId) {
        answerRepository.deleteById(answerId);
    }


    // 답변 조회
    public Answer findAnswerById(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer answer = optionalAnswer.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return  answer;
    }

//    // 회원 조회
//    public Member findMemberById(Long memberId) {
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        Member member = optionalMember.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        return member;
//    }
//
//    // 질문 조회
//    public Question findQuestionById(Long questionId) {
//        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
//        Question question = optionalQuestion.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        return question;
//    }
}
