package com.preproject.server.question.service;


import com.preproject.server.answer.entity.Answer;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.repository.MemberRepository;
import com.preproject.server.question.exception.BusinessLogicException;
import com.preproject.server.question.exception.ExceptionCode;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;

    public QuestionService(QuestionRepository questionRepository, MemberRepository memberRepository) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
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
    public Question findQuestion(long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }


    // 질문 조회(페이지네이션 구현)
    public Page<Question> findQuestions(int page, int size) { // page, size를 매개변수로 멤버를 조회

        // page, size를 기반으로 PageRequest 객체를 내림차순으로 생성해서 페이지네이션 적용
        // PageRequest 페이지 번호와 페이지 크기를 나타내는 정보 값을 가짐 + 오름차순 정렬
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("questionId").ascending());

        // pageRequest를 이용해 등록된 답변 조회
        Page<Question> questionPage = questionRepository.findAll(pageRequest);

        return questionPage;
    }

    public void deleteQuestion(long questionId){
        Question foundQuestion = findQuestion(questionId);
        questionRepository.delete(foundQuestion);
    }

        // 질문 조회
    public Question findQuestionById(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return question;
    }

    /**
     * 회원이 질문한 개수 카운트해주는 메서드 추가 + 회원 findMemberById 메서드
     */
    public int countQuestionsByMemberId(long memberId) {
        // 회원 ID로 Member 객체를 가져온다.
        Member member = findMemberById(memberId);

        // 해당 회원이 작성한 질문의 개수를 센다.
        int questionCount = 0;
        List<Question> questions = questionRepository.findAll();
        for (Question question : questions) {
            if (question.getMember().equals(member)) {
                questionCount++;
            }
        }

        return questionCount;
    }

        // 회원 조회
    public Member findMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return member;
    }

}
