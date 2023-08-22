package com.preproject.server.auth.userDetails;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class LoginMemberIdResolver {

//    public static Long getLoginMemberId() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        MemberDetailsService.MemberDetails memberDetails = (MemberDetailsService.MemberDetails) principal;
//        return memberDetails.getMemberId();
//    }
    public static String getLoginMemberEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof String) {
            return (String) principal; // 이 경우 principal이 이메일 값이므로 바로 반환
        } else if (principal instanceof MemberDetailsService.MemberDetails) {
            MemberDetailsService.MemberDetails memberDetails = (MemberDetailsService.MemberDetails) principal;
            return memberDetails.getEmail();
        } else {
            throw new IllegalStateException("Unexpected principal type: " + principal.getClass());
        }
    }


}
