package com.preproject.server.answer.service;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.repository.AnswerRepository;
import com.preproject.server.auth.userDetails.LoginMemberIdResolver;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.repository.MemberRepository;
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

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final QuestionService questionService;

    private final MemberService memberService;


    public AnswerService(AnswerRepository answerRepository, MemberService memberService, QuestionService questionService) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.questionService = questionService;
    }

    //     답변 등록
    public Answer createAnswer(Answer answer, long questionId, String email) {


        // 질문 ID를 이용해서 질문 찾기
        Question question = questionService.findQuestion(questionId);

        // 회원 ID를 이용해서 회원 찾기
        Member member = memberService.findVerifiedMemberByEmail(email);

        // 답변 엔티티에 질문과 회원정보 설정
        answer.setQuestion(question);
        answer.setMember(member);

        // 설정된 답변 엔티티를 저장하고 반환
        return answerRepository.save(answer);
    }

    // 답변 수정
    public Answer updateAnswer(Answer answer, String content) {

        // 답변 검증
        Answer findanswer = findAnswerById(answer.getAnswerId());
        String answerEmail = findanswer.getMember().getEmail();

        // 회원 = 답변
        questionService.verifyAccess(answerEmail, LoginMemberIdResolver.getLoginMemberEmail());

        // 질문 ID를 이용해서 질문 찾기
        Question question = questionService.findQuestion(findanswer.getQuestion().getQuestionId());
        Long findanswerId = findanswer.getQuestion().getQuestionId();

        if (question.getQuestionId().equals(findanswerId)) {

            // 답변 내용 업데이트
            if (content != null) {
                findanswer.setContent(content);
            }
        }

        return answerRepository.save(findanswer);
    }


    public Page<Answer> findAnswers(int page, int size, long questionId) { // page, size를 매개변수로 멤버를 조회
        // 답변 조회(페이지네이션 구현)

        Question question = questionService.findQuestion(questionId);

        // page, size를 기반으로 PageRequest 객체를 내림차순으로 생성해서 페이지네이션 적용
        // PageRequest 페이지 번호와 페이지 크기를 나타내는 정보 값을 가짐 + 오름차순 정렬
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("answerId").descending());

        // pageRequest를 이용해 등록된 답변 조회
        Page<Answer> answerPage = answerRepository.findByQuestion(question, pageRequest);

        return answerPage;

    }

    public void deleteAnswer(Long answerId) {

        // 회원 검증
        Answer findanswer = findAnswerById(answerId);
        String answerEmail = findanswer.getMember().getEmail();

        // 회원 = 답변
        questionService.verifyAccess(answerEmail, LoginMemberIdResolver.getLoginMemberEmail());

//        // 질문 ID를 이용해서 질문 찾기
//        Question question = questionService.findQuestion(findanswer.getQuestion().getQuestionId());
//        Long findanswerId = findanswer.getQuestion().getQuestionId();

//        if (question.getQuestionId().equals(findanswerId)) {

        answerRepository.deleteById(findanswer.getAnswerId());
    }

    // 답변 조회
    public Answer findAnswerById(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer answer = optionalAnswer.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return answer;
    }

    /**
     * 회원이 답변한 개수 카운트해주는 메서드 추가 + 회원 findMemberById 메서드
     */
    public int countAnswerByMemberId(long memberId) {

        // 회원 ID로 Member 객체를 가져온다.
        Member member = memberService.findVerifiedMember(memberId);

        // 해당 회원이 작성한 답변의 개수를 센다.
        int answerCount = 0;
        List<Answer> answers = answerRepository.findAll();
        for (Answer answer : answers) {
            if (answer.getMember() != null && answer.getMember().equals(member)) {
                answerCount++;
            }
        }

        return answerCount;
    }
}


//    public Answer findAnswer(Long answerId) {return findAnswerById(answerId);}
//        // 존재하는 회원인지 확인
//        memberService.findVerifiedMember(answer.getMember().getMemberId());
//
//        Question findQuestion = questionService.findQuestion(answer.getQuestion().getQuestionId());
//
//        answer.setQuestion(findQuestion);

// 주어진 Answer 객체에서 회원 정보와 질문 정보 가져오기
//        Member verifiedMember = memberService.findVerifiedMember(answer.getMember().getMemberId());