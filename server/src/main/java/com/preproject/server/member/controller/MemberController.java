package com.preproject.server.member.controller;

import com.preproject.server.answer.repository.AnswerRepository;
import com.preproject.server.answer.service.AnswerService;
import com.preproject.server.member.dto.MemberPatchDto;
import com.preproject.server.member.dto.MemberPostDto;
import com.preproject.server.member.dto.MemberResponseDto;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.member.service.MemberService;
import com.preproject.server.question.repository.QuestionRepository;
import com.preproject.server.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/member")
@Validated
@Slf4j
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService memberService;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final AnswerService answerService;


    @PostMapping("/createMember") //엔드포인트 변경예정
    public ResponseEntity postMember(@Validated @RequestBody MemberPostDto memberPostDto) {
        Member member = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.CREATED);
    }

    @PatchMapping("/updateMember/{member-id}") //엔드포인트 변경예정
    public ResponseEntity updateMember(@Positive @PathVariable("member-id") long memberId,
                                       @RequestBody MemberPatchDto memberPatchDto) {
        memberPatchDto.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchToMember(memberPatchDto));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    /**
     * 수정한 부분 -> 질문, 답변 개수 같이 응답되도록 추가
     */
    @GetMapping("/findMember/{member-id}") //엔드포인트 변경예정
    public ResponseEntity findMember(@Positive @PathVariable("member-id") long memberId) {
        Member member = memberService.findMember(memberId);

        // 회원이 작성한 질문, 답변 개수 조회
        long questionCount = questionService.countQuestionsByMemberId(memberId);
        long answerCount = answerService.countAnswerByMemberId(memberId);


        MemberResponseDto responseDto = mapper.memberToMemberResponseDto(member);

        // 질문, 답변 개수를 responseDto에 설정
        responseDto.setQuestionCount(questionCount);
        responseDto.setAnswerCount(answerCount);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    @DeleteMapping("/deleteMember/{member-id}") //엔드포인트 변경예정
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
