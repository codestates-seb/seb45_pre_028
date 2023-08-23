package com.preproject.server.member.service;

import com.preproject.server.auth.utils.CustomAuthorityUtils;
import com.preproject.server.exception.BusinessLogicException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = customAuthorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {

        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName()).ifPresent(findMember::setName);
        Optional.ofNullable(member.getPassword()).ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getAbout()).ifPresent(findMember::setAbout);
        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }

    // 존재하는 멤버인지 확인하는 메서드
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    //    회원가입시 존재하는 회원인지 확인하는 메서드
    private void verifyExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
//    Exception 코드 작성 후 예외처리 해야함
    }

    // 존재하는 멤버인지 확인하는 메서드(Email)
    public Member findVerifiedMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}
