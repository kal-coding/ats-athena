export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Departments: {
        Row: {
          created_at: string
          department_id: string
          entity_id: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          department_id?: string
          entity_id?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          department_id?: string
          entity_id?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Departments_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "Entities"
            referencedColumns: ["entity_id"]
          },
        ]
      }
      Entities: {
        Row: {
          created_at: string
          entity_id: string
          name: string | null
          organization_id: string | null
        }
        Insert: {
          created_at?: string
          entity_id?: string
          name?: string | null
          organization_id?: string | null
        }
        Update: {
          created_at?: string
          entity_id?: string
          name?: string | null
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Entities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "Organizations"
            referencedColumns: ["organization_id"]
          },
        ]
      }
      Organizations: {
        Row: {
          created_at: string
          name: string | null
          organization_id: string
        }
        Insert: {
          created_at?: string
          name?: string | null
          organization_id?: string
        }
        Update: {
          created_at?: string
          name?: string | null
          organization_id?: string
        }
        Relationships: []
      }
      Recruitment_Pipelines: {
        Row: {
          created_at: string
          name: string | null
          organization_id: string | null
          recruitment_pipeline_id: string
        }
        Insert: {
          created_at?: string
          name?: string | null
          organization_id?: string | null
          recruitment_pipeline_id?: string
        }
        Update: {
          created_at?: string
          name?: string | null
          organization_id?: string | null
          recruitment_pipeline_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Recruitment_Pipelines_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "Organizations"
            referencedColumns: ["organization_id"]
          },
        ]
      }
      Teams: {
        Row: {
          created_at: string
          department_id: string | null
          name: string | null
          team_id: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          name?: string | null
          team_id?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          name?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Teams_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "Departments"
            referencedColumns: ["department_id"]
          },
        ]
      }
      Vacant_Jobs: {
        Row: {
          created_at: string
          department_id: string | null
          entity_id: string | null
          organization_id: string
          recruitment_pipeline_id: string | null
          role_description: string | null
          role_name: string | null
          team_id: string | null
          vacant_job_id: number
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          entity_id?: string | null
          organization_id: string
          recruitment_pipeline_id?: string | null
          role_description?: string | null
          role_name?: string | null
          team_id?: string | null
          vacant_job_id?: number
        }
        Update: {
          created_at?: string
          department_id?: string | null
          entity_id?: string | null
          organization_id?: string
          recruitment_pipeline_id?: string | null
          role_description?: string | null
          role_name?: string | null
          team_id?: string | null
          vacant_job_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Vacant_Jobs_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "Departments"
            referencedColumns: ["department_id"]
          },
          {
            foreignKeyName: "Vacant_Jobs_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "Entities"
            referencedColumns: ["entity_id"]
          },
          {
            foreignKeyName: "Vacant_Jobs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "Organizations"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "Vacant_Jobs_recruitment_pipeline_id_fkey"
            columns: ["recruitment_pipeline_id"]
            isOneToOne: false
            referencedRelation: "Recruitment_Pipelines"
            referencedColumns: ["recruitment_pipeline_id"]
          },
          {
            foreignKeyName: "Vacant_Jobs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "Teams"
            referencedColumns: ["team_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
