package com.preproject.server.member.service;

import com.preproject.server.answer.repository.AnswerRepository;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.repository.MemberRepository;
import com.preproject.server.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    // 질문, 답변 수를 조회하기 위해서 추가
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;



    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());
        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {

        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName()).ifPresent(findMember::setName);
        Optional.ofNullable(member.getPassword()).ifPresent(findMember::setPassword);
        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }



    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }
// 존재하는 멤버인지 확인
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow();
        return findMember;
    }

//    회원가입시 존재하는 회원인지 확인하는 메서드
    private void verifyExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
//    Exception 코드 작성 후 예외처리 해야함
    }

}
