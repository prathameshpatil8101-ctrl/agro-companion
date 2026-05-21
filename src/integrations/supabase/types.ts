export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      crop_reminders: {
        Row: {
          created_at: string
          crop_name: string
          done: boolean
          due_date: string
          id: string
          plot_id: string | null
          task: string
          user_id: string
        }
        Insert: {
          created_at?: string
          crop_name: string
          done?: boolean
          due_date: string
          id?: string
          plot_id?: string | null
          task: string
          user_id: string
        }
        Update: {
          created_at?: string
          crop_name?: string
          done?: boolean
          due_date?: string
          id?: string
          plot_id?: string | null
          task?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crop_reminders_plot_id_fkey"
            columns: ["plot_id"]
            isOneToOne: false
            referencedRelation: "farm_plots"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_plots: {
        Row: {
          area_acres: number | null
          created_at: string
          current_crop: string | null
          id: string
          name: string
          notes: string | null
          soil_type: string | null
          sowing_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          area_acres?: number | null
          created_at?: string
          current_crop?: string | null
          id?: string
          name: string
          notes?: string | null
          soil_type?: string | null
          sowing_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          area_acres?: number | null
          created_at?: string
          current_crop?: string | null
          id?: string
          name?: string
          notes?: string | null
          soil_type?: string | null
          sowing_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          id: string
          location: string
          message: string
          name: string
          rating: number
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          message: string
          name: string
          rating: number
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          message?: string
          name?: string
          rating?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          district: string | null
          id: string
          mobile: string | null
          preferred_language: string | null
          primary_crops: string[] | null
          state: string | null
          total_land_acres: number | null
          updated_at: string
          user_id: string
          village: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          district?: string | null
          id?: string
          mobile?: string | null
          preferred_language?: string | null
          primary_crops?: string[] | null
          state?: string | null
          total_land_acres?: number | null
          updated_at?: string
          user_id: string
          village?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          district?: string | null
          id?: string
          mobile?: string | null
          preferred_language?: string | null
          primary_crops?: string[] | null
          state?: string | null
          total_land_acres?: number | null
          updated_at?: string
          user_id?: string
          village?: string | null
        }
        Relationships: []
      }
      saved_diagnoses: {
        Row: {
          confidence: number | null
          created_at: string
          crop_name: string | null
          disease_name: string | null
          id: string
          image_url: string | null
          organic_treatment: string | null
          symptoms: string | null
          treatment: string | null
          user_id: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          crop_name?: string | null
          disease_name?: string | null
          id?: string
          image_url?: string | null
          organic_treatment?: string | null
          symptoms?: string | null
          treatment?: string | null
          user_id: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          crop_name?: string | null
          disease_name?: string | null
          id?: string
          image_url?: string | null
          organic_treatment?: string | null
          symptoms?: string | null
          treatment?: string | null
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
