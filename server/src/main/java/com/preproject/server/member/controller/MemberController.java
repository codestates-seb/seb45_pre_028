package com.preproject.server.member.controller;

import com.preproject.server.member.dto.MemberPatchDto;
import com.preproject.server.member.dto.MemberPostDto;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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

    @GetMapping("/findMember/{member-id}") //엔드포인트 변경예정
    public ResponseEntity findMember(@Positive @PathVariable("member-id") long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @DeleteMapping("/deleteMember/{member-id}") //엔드포인트 변경예정
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
