package com.preproject.server.question.service;


import com.preproject.server.auth.userDetails.LoginMemberIdResolver;
import com.preproject.server.exception.BusinessLogicException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.service.MemberService;
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
@Transactional
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;


    public QuestionService(QuestionRepository questionRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }


    public Question createQuestion(Question question, String email){

        // 회원 찾기
        Member member = memberService.findVerifiedMemberByEmail(email);

        // 답변 엔티티에 질문과 회원정보 설정
        question.setMember(member);

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){

        // 질문 검증
        Question updatedQuestion = findQuestion(question.getQuestionId());
        String questionEmail = updatedQuestion.getMember().getEmail();

        // 회원 = 질문
        verifyAccess(questionEmail, LoginMemberIdResolver.getLoginMemberEmail());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> updatedQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> updatedQuestion.setContent(content));

        return questionRepository.save(updatedQuestion);
    }

//    @Transactional(readOnly = true)
    public Question findQuestion(long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }


    // 질문 조회(페이지네이션 구현)
    public Page<Question> findQuestions(int page, int size) { // page, size를 매개변수로 멤버를 조회

        // page, size를 기반으로 PageRequest 객체를 내림차순으로 생성해서 페이지네이션 적용
        // PageRequest 페이지 번호와 페이지 크기를 나타내는 정보 값을 가짐 + 오름차순 정렬
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("questionId").descending());

        // pageRequest를 이용해 등록된 답변 조회
        Page<Question> questionPage = questionRepository.findAll(pageRequest);

        return questionPage;
    }

    public void deleteQuestion(long questionId){

        // 질문 검증
        Question foundQuestion = findQuestion(questionId);
        String questionEmail = foundQuestion.getMember().getEmail();

        // 회원 = 질문
        verifyAccess(questionEmail, LoginMemberIdResolver.getLoginMemberEmail());
        questionRepository.delete(foundQuestion);
    }

    public int countQuestionsByMemberId(long memberId) {
        // 회원 ID로 Member 객체를 가져온다.
        Member member = memberService.findVerifiedMember(memberId);

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

    // 수정 권한 검증
    public void verifyAccess(String questionEmail, String memberEmail) {
        if(!questionEmail.equals(memberEmail)) {
            throw  new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }
    }
}
