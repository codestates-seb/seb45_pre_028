package com.preproject.server.member.mapper;

import com.preproject.server.member.dto.MemberPatchDto;
import com.preproject.server.member.dto.MemberPostDto;
import com.preproject.server.member.dto.MemberResponseDto;
import com.preproject.server.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchToMember(MemberPatchDto memberPatchDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

}
