package com.preproject.server.answer.service;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.repository.AnswerRepository;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.service.MemberService;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.repository.QuestionRepository;
import com.preproject.server.question.service.QuestionService;
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

    private final QuestionService questionService;
    private final QuestionRepository questionRepository;

    private final MemberService memberService;


    public AnswerService(AnswerRepository answerRepository, MemberService memberService, QuestionService questionService, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.questionService = questionService;
        this.questionRepository = questionRepository;
    }

    //     답변 등록
    public Answer createAnswer(Answer answer, long questionId) {

//        // 존재하는 회원인지 확인
//        memberService.findVerifiedMember(answer.getMember().getMemberId());
//
//        Question findQuestion = questionService.findQuestion(answer.getQuestion().getQuestionId());
//
//        answer.setQuestion(findQuestion);

        // 주어진 Answer 객체에서 회원 정보와 질문 정보 가져오기
//        Member verifiedMember = memberService.findVerifiedMember(answer.getMember().getMemberId());
        Question question = questionService.findQuestionById(questionId);

        answer.setQuestion(question);


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
    public Page<Answer> findAnswers(int page, int size, long questionId) { // page, size를 매개변수로 멤버를 조회

        Question question = questionService.findQuestionById(questionId);

        // page, size를 기반으로 PageRequest 객체를 내림차순으로 생성해서 페이지네이션 적용
        // PageRequest 페이지 번호와 페이지 크기를 나타내는 정보 값을 가짐 + 오름차순 정렬
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("answerId").ascending());

        // pageRequest를 이용해 등록된 답변 조회
        Page<Answer> answerPage = answerRepository.findByQuestion(question, pageRequest);

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
